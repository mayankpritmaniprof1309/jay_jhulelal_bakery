import React from 'react'
import S3_card from './S3_card'

const Homepage_s3 = ({ items }) => {

  // duplicate items for seamless infinite loop
  const loopItems = [...items, ...items]

  return (
    <div className="overflow-hidden mx-3 ps-10 rounded-xl bg-[rgb(151,122,115)]">

      <div className="flex gap-6 animate-scroll">
        {loopItems.map((elem, i) => (
          <div key={i} className="min-w-[25%]">
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