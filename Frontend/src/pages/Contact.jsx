import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletterbox from '../components/Newsletterbox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
      <img className='w-full md:max-w-[480px]' src={assets.contact_img} />
      <div className="flex flex-col justify-center items-start gap-6">
        <p className='font-semibold text-xl text-gray-600'>OUR STORE</p>
        <p className=' text-gray-600'>5479 William station <br/> Suites 350-a, Washington, DC </p>
        <p className=' text-gray-600'>Tel: (415) 555-0192 <br/> Email: admin@trendpocket.com </p>
      </div>
      </div>
      <Newsletterbox />
    </div>
  )
}

export default Contact