import React from 'react'

const S3_cardContent = (props) => {
  return (
    <div className='absolute h-full  w-full top-0 left-0 flex flex-col justify-between p-6'>
        
            <h1 className='text-6xl font-serif justify-between mt-10 text-white py-7'>
                {props.name}
            </h1>
        
            <p className='justify-between text-white pb-10 mb-10 text-xl'>
                {props.desc}
            </p>
    </div>
  )
}

export default S3_cardContent