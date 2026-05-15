import React from 'react'
import S2_leftBox from './S2_leftBox'
import S2_rightBox from './S2_rightBox'

const Homepage_s2 = () => {
  return (
    <div id='about' className='mx-3 flex flex-col md:flex-row justify-between'>
    <div id='about' className='w-full flex flex-col md:flex-row justify-between'>

        <S2_leftBox />
        <S2_rightBox />
    </div>
    </div>
  )
}

export default Homepage_s2