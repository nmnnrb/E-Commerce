import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list , setList] = useState([]);

  const fetchList = async () => {
    try {
        const response = await axios.get(backendUrl + '/api/product/list');

     await setList(response.data.products);
      console.log("list is " ,  list);
    } catch (error) {
      toast.error("Something went wrong on server Size( FREE SERVER ) !");

    }
  }

  useEffect(() => {
    fetchList();
  }, [])


  const deleteProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove' , {id} , {headers: {token}})
      if(response.data.sucess){
        toast.success("Product removed successfully")
       await fetchList();
      }else{
        toast.error("Failed to remove product")
      }
    } catch (error) {
      toast.error("Something went wrong on server Size( FREE SERVER ) !");
      
    }
  }

  return (
    <>
    <p className='mb-2'>Listed Products</p>
    <div className="flex flex-col gap-2">

    {/* -----------List Table */}
    <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-slate-300" >
      <b>Images</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className='text-center'>Action</b>
    </div>
    {
      list.map((item,index) => (
        <div key={index} className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-slate-200" >
        <img className='w-[90px] h-[90px]' src={item.image[0]} ></img>
      <b>{item.name}</b>
      <b>{item.category}</b>
      <b>{currency}{item.price}</b>
      <b onClick={() => deleteProduct(item._id)} className='text-center hover:text-xl hover:text-red-500 text-blue-500'>X</b>
    </div>
      ))
    }
    </div>

    </>
  )
}

export default List