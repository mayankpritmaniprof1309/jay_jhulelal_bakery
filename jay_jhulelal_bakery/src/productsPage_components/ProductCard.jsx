import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import{showCartToast} from './cartToast'

const StarIcon = ({ filled }) => (
  <svg width="12" height="12" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: filled ? 1 : 0.3 }}>
    <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z"
      fill="#d4770a" />
  </svg>
)

const CartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3h2l.4 2M7 13h10l1.4-7H5.4M7 13l-1.4-7M7 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"
      stroke="#fdf5ec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 17s-7-4.5-7-9a4 4 0 018 0 4 4 0 018 0c0 4.5-7 9-7 9z"
      stroke="#a0642a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ProductCard = (props) => {
  const navigate=useNavigate()
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart();

  const handelAddCart = async (product) => {
  try {
    await addToCart({
      _id:      props._id?.$oid ?? props._id,
      name:     props.name,
      price:    props.price,
      image:    props.image,
      quantity: quantity,
    });
 
    // ✅ Show the toast after a successful add
    showCartToast({
      name:  props.name,
      image: props.image,
      price: props.price,
    });
 
  } catch (err) {
    if (err.response?.status === 401) {
      alert("Please log in first to add items to the cart!");
      navigate("/user/login");
    } else {
      console.error("Add to cart failed:", err.response?.data || err.message);
    }
  }
};

  const decrease = () => { if (quantity > 1) setQuantity(quantity - 1) }
  const increase = () => { setQuantity(quantity + 1) }

  return (
    <div className="bg-[rgb(230,211,179)] rounded-[20px] w-full sm:w-75 overflow-hidden
                    border border-[rgba(160,110,60,0.25)]
                    shadow-[0_16px_40px_rgba(140,90,40,0.15),0_4px_12px_rgba(140,90,40,0.08)]
                    transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]
                    hover:-translate-y-1.5 hover:scale-[1.01]
                    hover:shadow-[0_24px_50px_rgba(140,90,40,0.22)]">

      {/* ── Image area ── */}
      <div className="relative h-48 sm:h-50 bg-[rgba(200,170,120,0.2)] overflow-hidden group">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist button */}
        <button className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full
                           bg-[rgba(245,233,220,0.9)] border-none cursor-pointer
                           flex items-center justify-center
                           transition-all duration-200 hover:bg-white hover:scale-110">
          <HeartIcon />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="px-4 sm:px-4.5 pt-4 pb-4 sm:pb-4.5">

        {/* Name */}
        <h2 className="font-['Playfair_Display',serif] text-[18px] sm:text-[20px] text-[#3b2409]
                       leading-tight mb-1.5">
          {props.name}
        </h2>

        {/* Description */}
        <p className="text-[12px] text-[#7a5c38] leading-relaxed mb-3 line-clamp-2">
          {props.desc}
        </p>

        {/* Divider */}
        <div className="h-px bg-[rgba(160,110,60,0.18)] mb-3" />

        {/* Price + Rating row */}
        <div className="flex items-center justify-between mb-3.5">

          {/* Price + qty unit */}
          <div className="flex items-baseline gap-1">
            <span className="font-['Playfair_Display',serif] text-[20px] sm:text-[22px] font-semibold text-[#7a3f10]">
              ₹{props.price}
            </span>
            <span className="text-[11px] text-[#a07850] font-medium">
              / {props.qty}
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            <div className="flex gap-px">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} filled={s <= (props.rating ?? 4)} />
              ))}
            </div>
            <span className="text-[11px] text-[#a07850]">
              ({props.reviews ?? 128})
            </span>
          </div>

        </div>

        {/* Quantity row */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-[12px] font-medium text-[#7a5c38]">Quantity</span>
          <div className="flex items-center gap-1.5">

            <button
              onClick={decrease}
              className="w-7 h-7 rounded-lg bg-[rgba(245,233,220,0.8)]
                         border border-[rgba(160,110,60,0.3)] text-[#7a3f10]
                         text-base font-medium cursor-pointer
                         flex items-center justify-center
                         transition-all duration-150 hover:bg-[rgba(245,233,220,1)]
                         hover:scale-105 active:scale-95"
            >
              −
            </button>

            <span className="w-7 h-7 rounded-lg bg-[rgba(245,233,220,0.8)]
                             border border-[rgba(160,110,60,0.3)]
                             flex items-center justify-center
                             text-[13px] font-semibold text-[#3b2409]">
              {quantity}
            </span>

            <button
              onClick={increase}
              className="w-7 h-7 rounded-lg bg-[rgba(245,233,220,0.8)]
                         border border-[rgba(160,110,60,0.3)] text-[#7a3f10]
                         text-base font-medium cursor-pointer
                         flex items-center justify-center
                         transition-all duration-150 hover:bg-[rgba(245,233,220,1)]
                         hover:scale-105 active:scale-95"
            >
              +
            </button>

          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handelAddCart}
          className="w-full py-2.75 bg-linear-to-br from-[#a0642a] to-[#7a3f10]
                     text-[#fdf5ec] rounded-xl border-none cursor-pointer
                     flex items-center justify-center gap-2
                     text-[13.5px] font-semibold tracking-wide
                     shadow-[0_4px_14px_rgba(120,70,20,0.3)]
                     transition-all duration-200
                     hover:-translate-y-0.5 hover:scale-[1.01]
                     hover:shadow-[0_8px_22px_rgba(120,70,20,0.38)]
                     active:scale-[.98]"
        >
          <CartIcon />
          Add to cart
        </button>

      </div>
    </div>
  )
}

export default ProductCard