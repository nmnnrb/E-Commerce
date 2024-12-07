import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletterbox from '../components/Newsletterbox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="flex my-10 flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum itaque voluptate quas omnis fuga minima dolore nobis at nemo rerum, officia sit, ipsam accusantium distinctio perspiciatis neque minus ab repellendus nostrum pariatur, ea a autem. Quisquam omnis quia eum harum maiores eius nobis tempore, nihil commodi laudantium, nesciunt voluptatum eaque.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, omnis et. Obcaecati officiis accusamus dignissimos alias provident officia eius fugit.</p>
          <b className='text-gray-800'>Our Misson</b>
          <p>Our Misson Lorem ipsum dolor sit, amet consectetur adipisicing elit. A enim repellendus assumenda ab temporibus voluptatem voluptatum quas ipsa accusantium quasi impedit fuga, delectus incidunt? Id maiores repellat asperiores aliquam atque cum quis consequatur quibusdam sunt. Aut dolorum ad odio totam praesentium! Aliquid, perferendis voluptatibus. Iusto ea, quae beatae error, rem porro sunt officia delectus dolore accusantium harum dolorem provident exercitationem aliquam. Nisi quam delectus blanditiis deserunt. Ad enim aspernatur provident, laudantium illum perspiciatis doloribus veniam, sint nam nostrum repudiandae magnam dolore accusantium voluptatem labore minus, possimus adipisci? Iusto, veniam commodi.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'OUR'} text2={'PARTNERS'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
              <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                <b>Quality Assurance</b>
                <p className='text-gray-600' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam totam molestiae explicabo dicta praesentium fugiat eaque quo ipsum sed dolorum fuga distinctio voluptatem labore unde esse illo, iusto mollitia reiciendis vitae repudiandae iste quia. Nam in perspiciatis facere, porro dignissimos tempora officia natus itaque asperiores ipsum voluptas? Odit, voluptas ipsa!</p>
              </div>
              <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                <b>Convenience</b>
                <p className='text-gray-600' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam totam molestiae explicabo dicta praesentium fugiat eaque quo ipsum sed dolorum fuga distinctio voluptatem labore unde esse illo, iusto mollitia reiciendis vitae repudiandae iste quia. Nam in perspiciatis facere, porro dignissimos tempora officia natus itaque asperiores ipsum voluptas? Odit, voluptas ipsa!</p>
              </div>
              <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                <b>Exceptional Customer Service</b>
                <p className='text-gray-600' >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam totam molestiae explicabo dicta praesentium fugiat eaque quo ipsum sed dolorum fuga distinctio voluptatem labore unde esse illo, iusto mollitia reiciendis vitae repudiandae iste quia. Nam in perspiciatis facere, porro dignissimos tempora officia natus itaque asperiores ipsum voluptas? Odit, voluptas ipsa!</p>
              </div>
      </div>
      <Newsletterbox />
    </div>
  )
}

export default About