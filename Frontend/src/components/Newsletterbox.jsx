import React from 'react'

const Newsletterbox = () => {
    const onSubmitHandeler = (e) => {
        e.preventDefault();
    }
  return (
    <div className='text-center' >
        <p className='text-2xl font-medium text-gray-800 ' > Subscribe Now & get 20% OFF</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut architecto nobis incidunt aperiam odit unde dolore minima alias, quasi quas.</p>
        <form onSubmit={onSubmitHandeler} className='w-full sm:w-1/2 flex items-center gap-1 mx-auto my-6  pl-3' >
            <input type='email' className='border-[1px] rounded-sm sm:flex-1 outline-none border-gray-500 p-3 w-2/3' placeholder='Enter Your Email'/>
            <button className='py-4 px-10 rounded-sm bg-black text-xs text-white font-medium'>Subscribe</button> 
        </form>
    </div>
  )
}

export default Newsletterbox