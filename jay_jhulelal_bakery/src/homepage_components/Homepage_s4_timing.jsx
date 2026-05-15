import React from 'react'
import S4_card_for_image from './S4_card_for_image'

const Homepage_s4_timing = () => {
  return (
    <div className='mx-1 md:mx-3 w-full shrink-0 relative mt-5 bg-amber-50 rounded-4xl min-h-125 md:min-h-screen'>
        <img className='absolute inset-0 h-full w-full object-cover brightness-50 rounded-4xl' src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        <S4_card_for_image />
    </div>
  )
}

export default Homepage_s4_timing