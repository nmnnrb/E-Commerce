import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const[method, setMethod] = useState('cod');
  const {navigate , backendUrl, token , cartItems, setCartItems, getCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);

  const [formData, setformData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value  = e.target.value;

    setformData(data => ({...data, [name]: value}))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
   try {
    let orderItems = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          const itemInfo = structuredClone(products.find(product => product._id === items))
          if(itemInfo){
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo)
          }
        }
      }
    }
    let orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    }
    switch(method){
      //api calls for cod order
      case 'cod':
        const response = await axios.post(
          backendUrl + '/api/order/place',
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if(response.data.sucess){
          setCartItems({});
          navigate('/orders')
        }else{
          toast.error(response.data.message);
        }
      break;

      case 'stripe':
        const responseStripe = await axios.post(backendUrl + '/api/order/stripe' , orderData, { headers: { Authorization: `Bearer ${token}` } })
        if(responseStripe.data.sucess){
          const {session_url} = responseStripe.data;
          window.location.replace(session_url)
        }else{
          toast.error(responseStripe.data.message);
        }

      break;

      default:
        //api calls for other payment methods
        console.log('Payment method not supported')
        break;
    }
   } catch (error) {
    toast.error("Failed to place order")
    console.log(error);
   }
  }



  return (
    <form onSubmit={submitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* ----------Leftside---------- */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
              <div className="text-xl sm:text-2xl my-3">
                <Title text1={'DELIVERY'} text2={'INFORMATION'} />
              </div>
              <div className="flex gap-3">
                <input required onChange={onchangehandler} name='firstname' value={formData.firstname} type="text" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="First Name" />
                <input required onChange={onchangehandler} name='lastname' value={formData.lastname}  type="text" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="Last Name" />
              </div>
              <input required onChange={onchangehandler} name='email' value={formData.email}  type="email" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="Email Adress" />
              <input required onChange={onchangehandler} name='street' value={formData.street}  type="text" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="Street" />
              <div className="flex gap-3">
                <input required onChange={onchangehandler} name='city' value={formData.city}  type="text" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="City" />
                <input required onChange={onchangehandler} name='state' value={formData.state}  type="text" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="State" />
              </div>
              <div className="flex gap-3">
                <input required onChange={onchangehandler} name='pincode' value={formData.pincode}  type="number" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="Pin Code" />
                <input required onChange={onchangehandler} name='country' value={formData.country}  type="text" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="Country" />
              </div>
              <input required onChange={onchangehandler} name='phone' value={formData.phone}  type="number" className="border border-orange-300 rounded px-3.5 py-1.5 w-full" placeholder="Phone" />
        </div>

        {/* ----------Rightside------------ */}
        <div className="">
          <div className="min-w-80">
              <CartTotal />
          </div>
          <div className="mt-8">
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            {/* _-______PAYEMNT METHOD ______ */}
            <div className="flex gap-3 flex-col lg:flex-row lg:flex-wrap">
                    <div onMouseEnter={() => setMethod('stripe')}  className="flex items-center gap-3 border rounded-full p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border  rounded-full ${method === 'stripe' ? 'bg-orange-500' : ''}`} ></p>
                        <img className='h-5 mx-4'  src={assets.stripe_logo} alt="stripe" />
                    </div>
                    <div  onMouseEnter={() => setMethod('razorpay')} className="flex items-center gap-3 border rounded-full p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border  rounded-full ${method === 'razorpay' ? 'bg-orange-500' : ''}`} ></p>
                        <img className='h-5 mx-4'  src={assets.razorpay_logo} alt="stripe" />
                    </div>
                    <div  onMouseEnter={() => setMethod('cod')} className="flex items-center gap-3 border rounded-full p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border  rounded-full ${method === 'cod' ? 'bg-orange-500' : ''}`} ></p>
                       <p className='text-gray-700 text-sm font-medium mx-4 ' >CASH ON DELIVERY</p>
                    </div>
            </div>
            <div className="w-full text-center md:text-start mt-12">
                <button  type='submit' className=" bg-orange-500 px-8 py-4 rounded-xl text-white" >PLACE ORDER</button>
            </div>
          </div>
        </div>
    </form>
  )
}
export default PlaceOrder