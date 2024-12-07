import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div>
        <div className="inline-flex gap-2 items-center mb-3">
            <p className='text-gray-500'> {text1} <span className='text-gray-700 font-meium'>{text2}</span> </p>
            <p className='bg-gray-800 bg sm:w-12 h-[1px] sm:[h-2px] w-1/3'></p>
        </div>
    </div>
  )
}

export default Title