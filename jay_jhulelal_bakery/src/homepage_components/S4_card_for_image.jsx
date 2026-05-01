import React from 'react'
import { MapPin, Clock, Phone } from 'lucide-react'

const S4_card_for_image = () => {
  return (
    <div className='absolute h-full  w-full top-0 left-0 flex flex-col  p-6'>
        
            <h1 className='text-5xl text-center font-serif  mt-20 text-white py-7'>
                Working Hours
                <hr class="border-t-2 border-gray-300 my-4 w-1/3 mx-auto"></hr>
            </h1>
            <h1 className='text-3xl text-center font-serif   text-white py-7'>
                Monday to Sunday<br />
                9 Am to 10 Pm

            </h1>
            <h1 className='text-3xl text-center font-serif  text-white py-7'>
                ANAND

            </h1>
             <h1 className='text-3xl text-center font-serif  text-white py-7'>
                <MapPin className="w-50 h-30 mx-auto" />
            </h1>
            
    </div>
  )
}

export default S4_card_for_image