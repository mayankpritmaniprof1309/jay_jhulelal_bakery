import React from 'react'
import S3_card from './S3_Card.jsx'

const Homepage_s3 = ({ items }) => {

  const loopItems = [...items, ...items]

  return (
    <div className="overflow-hidden mx-3 ps-4 md:ps-10 rounded-xl bg-[rgb(151,122,115)]">

      <div className="flex gap-3 md:gap-6 animate-scroll">
        {loopItems.map((elem, i) => (
          <div key={i} className="min-w-[80%] md:min-w-[25%]">
            <S3_card
              name={elem.name}
              image={elem.image}
              desc={elem.desc}
            />
          </div>
        ))}
      </div>

    </div>
  )
}

export default Homepage_s3