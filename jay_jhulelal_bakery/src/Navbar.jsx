import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='rounded-2xl p-3 font-serif text-amber-900 flex space-x-8'>
      
      <div>
        <h1 className="text-4xl font-bold">Jay Jhulelal Bakery</h1>
      </div>

      <div className='ml-auto text-2xl'> 
        <Link to="/">Home</Link>
      </div>

      <div className='text-2xl'>
        <Link to="/product">Products</Link>
      </div>

      <div className='text-2xl'>
        <Link to="/#about">About us</Link>
      </div>

      <div className='text-2xl'>
        <Link to="/cart">Cart</Link>
        </div>

        <div className='text-2xl'>
        <Link to="/user/login">Login</Link>
        </div>

      <div className='space-x-2'> 
        <input
        disabled
          className='border-2 rounded-2xl p-1'
          placeholder='Search'
          type='text'
        />
        <button className='bg-[rgb(114,87,81)] text-[rgb(240,236,223)] p-1 rounded-2xl'>
          Search
        </button>



      </div>

    </div>
  )
}

export default Navbar;