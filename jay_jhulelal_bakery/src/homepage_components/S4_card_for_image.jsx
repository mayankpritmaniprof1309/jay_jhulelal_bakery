import React from 'react'
import { MapPin } from 'lucide-react'

const S4_card_for_image = () => {
  return (
    <div className='absolute h-full w-full top-0 left-0 flex flex-col p-4 md:p-6'>
        
            <h1 className='text-3xl md:text-5xl text-center font-serif mt-10 md:mt-20 text-white py-4 md:py-7'>
                Working Hours
                <hr className="border-t-2 border-gray-300 my-3 md:my-4 w-1/3 mx-auto" />
            </h1>
            <h1 className='text-xl md:text-3xl text-center font-serif text-white py-4 md:py-7'>
                Monday to Sunday<br />
                9 Am to 10 Pm
            </h1>
            <h1 className='text-xl md:text-3xl text-center font-serif text-white py-4 md:py-7'>
                ANAND
            </h1>
            <h1 className='text-xl md:text-3xl text-center font-serif text-white py-4 md:py-7'>
                <MapPin className="w-10 h-10 md:w-16 md:h-16 mx-auto" />
            </h1>
            
    </div>
  )
}

export default S4_card_for_image