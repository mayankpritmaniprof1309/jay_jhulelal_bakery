import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Navbar = () => {
  const { isAdmin, isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <div className={`rounded-2xl p-3 pl-1 mx-2 font-serif transition-colors duration-300 ${
      isAdmin
        ? 'bg-[rgb(30,26,22)] text-[rgb(200,169,110)]'
        : 'text-amber-900'
    }`}>

      {/* Top bar: brand + hamburger */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold">Jay Jhulelal Bakery</h1>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-2xl p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ── USER NAV LINKS ── */}
      {!isAdmin && (
        <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-3 md:gap-0 md:space-x-6 mt-3 md:mt-0`}>
          <div className='md:ml-auto text-xl md:text-2xl'>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </div>
          <div className='text-xl md:text-2xl'>
            <Link to="/product" onClick={() => setMenuOpen(false)}>Products</Link>
          </div>
          <div className='text-xl md:text-2xl'>
            <Link to="/#about" onClick={() => setMenuOpen(false)}>About us</Link>
          </div>
          <div className='text-xl md:text-2xl'>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
          </div>
          {isLoggedIn ? (
            <div className='text-xl md:text-2xl'>
              <button onClick={handleLogout} className='font-serif'>Logout</button>
            </div>
          ) : (
            <div className='text-xl md:text-2xl'>
              <Link to="/user/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </div>
          )}
          <div className='flex gap-2'>
            <input
              className='border-2 rounded-2xl p-1 w-full md:w-auto'
              placeholder='Search'
              type='text'
            />
            <button className='bg-[rgb(114,87,81)] text-[rgb(240,236,223)] p-1 rounded-2xl whitespace-nowrap'>
              Search
            </button>
          </div>
        </div>
      )}

      {/* ── ADMIN NAV LINKS ── */}
      {isAdmin && (
        <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-3 md:gap-0 md:space-x-6 mt-3 md:mt-0`}>
          <div className='md:ml-auto text-xl md:text-2xl'>
            <Link to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          </div>
          <div className='text-xl md:text-2xl'>
            <Link to="/admin/products" onClick={() => setMenuOpen(false)}>Products</Link>
          </div>
          <div className='text-xl md:text-2xl'>
            <Link to="/admin/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
          </div>
          <div className='text-xl md:text-2xl'>
            <Link to="/admin/customers" onClick={() => setMenuOpen(false)}>Customers</Link>
          </div>
          <div className='text-xl md:text-2xl'>
            <Link to="/admin/analytics" onClick={() => setMenuOpen(false)}>Analytics</Link>
          </div>
          <div className='md:ml-auto flex items-center space-x-3 text-base'>
            <span className='bg-[rgb(200,169,110)] text-[rgb(30,26,22)] text-sm font-bold px-3 py-1 rounded-full'>
              Admin · {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className='border border-[rgb(200,169,110)] text-[rgb(200,169,110)] px-3 py-1 rounded-xl font-serif text-sm hover:bg-[rgb(42,36,32)] transition-colors'
            >
              Logout
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;