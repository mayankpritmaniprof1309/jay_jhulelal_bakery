import React from 'react'

const Homepage_s5_map = () => {
  return (
    <div className="relative  w-full mt-5 h-125 rounded-xl overflow-hidden">

      {/* MAP */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1886431.486894208!2d70.71022096250006!3d22.562772199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4f491cf5ea39%3A0x1aa6746e48ade4cc!2sJhulelal%20Bakery!5e0!3m2!1sen!2sin!4v1773908259946!5m2!1sen!2sin"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* OVERLAY */}
      <div className="absolute bottom-0 w-full bg-[rgb(151,122,115)]/90 text-[rgb(242,239,226)] p-8 grid grid-cols-2 md:grid-cols-4 gap-6">

        <div>
          <h2 className="font-bold">Bakery</h2>
          <p className="text-sm">Treat your sweet tooth here!</p>
        </div>

        <div>
          <h2 className="font-bold">Location</h2>
          <p className="text-sm">Anand, Gujarat</p>
        </div>

        <div>
          <h2 className="font-bold">Hours</h2>
          <p className="text-sm">9 AM - 11 PM</p>
        </div>

        <div>
          <h2 className="font-bold">Contact</h2>
          <p className="text-sm">+91 9998799987</p>
        </div>

      </div>

    </div>
  )
}

export default Homepage_s5_map