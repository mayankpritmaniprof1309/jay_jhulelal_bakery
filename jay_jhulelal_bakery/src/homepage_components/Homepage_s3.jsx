import React, { useRef } from 'react'
import S3_card from './S3_Card.jsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Homepage_s3 = ({ items, loading, error }) => {

  const trackRef    = useRef(null)
  const isDragging  = useRef(false)
  const startX      = useRef(0)
  const scrollStart = useRef(0)
  const dragMoved   = useRef(false)

  const navigate = useNavigate()

  // LOADING STATE ONLY FOR PRODUCTS SECTION
  if (loading) {
    return (
      <div className="relative mx-3 mb-4 rounded-xl bg-[rgb(151,122,115)] overflow-hidden p-4">

        <div className="flex gap-2 overflow-hidden">

          {[1,2,3].map((item) => (
            <div
              key={item}
              className="min-w-[80%] md:min-w-[28%] h-72
                         rounded-xl bg-white/20 animate-pulse shrink-0"
            />
          ))}

        </div>

      </div>
    )
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products
      </div>
    )
  }

  const scroll = (dir) => {
    const card = trackRef.current?.querySelector('[data-card]')
    const step = card ? card.offsetWidth + 24 : 300

    trackRef.current.scrollBy({
      left: dir * step,
      behavior: 'smooth'
    })
  }

  const onMouseDown = (e) => {
    isDragging.current  = true
    dragMoved.current   = false
    startX.current      = e.pageX
    scrollStart.current = trackRef.current.scrollLeft

    trackRef.current.style.cursor = 'grabbing'
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return

    const delta = e.pageX - startX.current

    if (Math.abs(delta) > 5) {
      dragMoved.current = true
    }

    trackRef.current.scrollLeft =
      scrollStart.current - delta
  }

  const onMouseUp = () => {
    isDragging.current = false

    trackRef.current.style.cursor = 'grab'
  }

  const onTouchStart = (e) => {
    startX.current      = e.touches[0].pageX
    scrollStart.current = trackRef.current.scrollLeft
    dragMoved.current   = false
  }

  const onTouchMove = (e) => {
    const delta = e.touches[0].pageX - startX.current

    if (Math.abs(delta) > 5) {
      dragMoved.current = true
    }

    trackRef.current.scrollLeft =
      scrollStart.current - delta
  }

  return (
    <div className="relative mx-3 mb-4 rounded-xl bg-[rgb(151,122,115)] overflow-hidden">

      <button
        onClick={() => scroll(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                   bg-white/20 hover:bg-white/40 transition
                   rounded-full p-2 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <div
        ref={trackRef}
        className="flex gap-1 md:gap-2 px-4 md:px-10 py-4
                   overflow-x-auto scroll-smooth
                   cursor-grab select-none
                   [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden"

        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >

        {items.map((elem) => (

          <div
            key={elem._id}
            data-card
            className="min-w-[80%] md:min-w-[28%]
                       shrink-0 cursor-pointer"

            onClick={() => {
              if (!dragMoved.current) {
                navigate('/product')
              }
            }}
          >

            <S3_card
              name={elem.name}
              image={elem.image}
              desc={elem.desc}
            />

          </div>

        ))}

      </div>

      <button
        onClick={() => scroll(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                   bg-white/20 hover:bg-white/40 transition
                   rounded-full p-2 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

    </div>
  )
}

export default Homepage_s3