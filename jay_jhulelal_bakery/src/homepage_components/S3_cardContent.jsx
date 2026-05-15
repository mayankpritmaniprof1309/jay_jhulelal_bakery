import React from 'react'

const S3_cardContent = (props) => {
  return (
    <div className='absolute h-full w-full top-0 left-0 flex flex-col justify-between p-3 md:p-6'>
        
            <h1 className='text-3xl md:text-6xl font-serif mt-5 md:mt-10 text-white py-3 md:py-7'>
                {props.name}
            </h1>
        
            <p className='text-white pb-5 mb-5 md:pb-10 md:mb-10 text-base md:text-xl'>
                {props.desc}
            </p>
    </div>
  )
}

export default S3_cardContent