import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const {products, currency , cartItems, updateQuantity , navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() =>{
    const tempData =[];
    if(products.length > 0){
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
             tempData.push({
              _id: items,
              size: item,
              quanity: cartItems[items][item]
             })
          }
        }
      }
      setCartData(tempData)
    }
   
  },[cartItems , products]);


  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
          <Title text1={'YOURS'} text2={'CART'} />
      </div>
      {
        cartData.map((item,index) => {
          const productData = products.find((product) => product._id === item._id); 
        console.log(item);

          return (
            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ">
                <div className="flex items-start gap-6" >
                <img className='w-16 sm:w-20'  src={productData.image[0]} alt="" />
                <div className="div">
                  <p className='text-xs sm:text=xl font-medium' >{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                  <p className='text-xs sm:text=xl font-medium' >{currency} {productData.price}</p>
                  <p className='text-xs px-2 sm:px-3 sm:py-1 border text-orange-600 bg-slate-50' >{item.size}</p>
                 
                  </div>
                </div>
                </div>
                <input onChange={(e)=> e.target.value ==='' || e.target.value ==='0' ? null : updateQuantity(item._id, item.size,Number(e.target.value)) } className='border max-w-10  text-orange-700 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} defaultValue={item.quanity} />
                <img onClick={()=> updateQuantity(item._id, item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer'  src={assets.bin_icon} alt="" />
            </div>
          );
        })}
      <CartTotal/>
        <div className="w-full ml-[13%] mt-8">
          <button onClick={() => navigate('/place-order')} className="bg-orange-500 text-white text-md  hover:text-blue-700 rounded-xl px-8 py-4">PROCEED TO CHECKOUT</button>
        </div>
    </div>
  );
};

export default Cart