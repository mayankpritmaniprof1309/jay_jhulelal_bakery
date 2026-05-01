import React from 'react'
import ProductCard from './ProductCard'


const Products = (props) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                gap-6 justify-items-center px-6 py-6 bg-[rgb(245,233,220)] '>
        {props.items.map(function(elem){
            return <ProductCard name={elem.name} desc={elem.desc} price={elem.price} image={elem.image} qty={elem.qty} rating={elem.rating} reviews={elem.reviews}/>
        })}
    </div>

  )
}

export default Products