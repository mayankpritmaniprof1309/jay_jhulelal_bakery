import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Homepage_s1 from './Homepage_s1'
import Homepage_s2 from './Homepage_s2'
import Homepage_s3 from './Homepage_s3'
import Homepage_s5_map from './Homepage_s5_map'
import Homepage_s4_timing from './Homepage_s4_timing'
import PoweredBy from './PoweredBy'

const Homepage = (props) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className='bg-[rgb(245,233,220)] px-1 md:px-0'>

      <Homepage_s1 />
      <Homepage_s2 />

      {/* About section starts here */}
      <div id="about" className='mt-5 md:mt-0'>
        <Homepage_s3 items={props.items} />
      </div>

      <Homepage_s4_timing />
      <Homepage_s5_map />
      <PoweredBy />
    </div>
  )
}

export default Homepage