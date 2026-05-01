import React from 'react'
import S3_cardContent from './S3_cardContent'

const S3_card = (props) => {
  return (
    <div className='h-full shrink-0 overflow-hidden relative hover:scale-105 bg-amber-50 w-80 rounded-4xl '>
        <img className='h-full w-full object-cover brightness-50 ' src={props.image} alt="" />
        <S3_cardContent name={props.name} desc={props.desc}/>
        
    </div>
  )
}

export default S3_card