import React from 'react'
import S3_card from './S3_card'
import S4_card_for_image from './S4_card_for_image'

const Homepage_s4_timing = () => {
  return (
    <div className='h-screen mx-3 w-full shrink-0 overflow-hidden relative mt-5  bg-amber-50 rounded-4xl '>
        <img className='h-full w-full object-cover brightness-50 ' src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        <S4_card_for_image />
    </div>
  )
}

export default Homepage_s4_timing