import S1_leftBox from './S1_leftBox'
import S1_rightBox from './S1_rightBox'

const Homepage_s1 = () => {
  return (
   <>
    <div className='h-auto md:h-180 mx-3 rounded-xl bg-[rgb(151,122,115)] flex flex-col md:flex-row justify-between pb-10 md:pb-0'>
        <S1_leftBox />
        <S1_rightBox />
    </div>
   </>
  )
}

export default Homepage_s1