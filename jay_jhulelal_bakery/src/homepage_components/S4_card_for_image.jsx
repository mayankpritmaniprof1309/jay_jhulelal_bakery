import React from 'react'
import { MapPin } from 'lucide-react'

const S4_card_for_image = () => {
  return (
    <div className='absolute h-full w-full top-0 left-0 flex flex-col justify-center items-center p-4 md:p-6 gap-2 md:gap-4'>

        <h1 className='text-3xl md:text-5xl text-center font-serif text-white'>
            Working Hours
            <hr className="border-t-2 border-gray-300 my-2 md:my-4 w-1/3 mx-auto" />
        </h1>

        <h1 className='text-xl md:text-3xl text-center font-serif text-white'>
            Monday to Sunday<br />
            9 Am to 10 Pm
        </h1>

        <h1 className='text-xl md:text-3xl text-center font-serif text-white'>
            ANAND
        </h1>

        <MapPin className="w-10 h-10 md:w-16 md:h-16 text-white" />

    </div>
  )
}

export default S4_card_for_image