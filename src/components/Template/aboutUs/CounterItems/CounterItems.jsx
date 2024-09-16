import React, { useEffect, useState } from 'react'

function CounterItems({count,title,percent}) {


   const [seconds, setSeconds] = useState(0);
   useEffect(() => {

      const timer = setTimeout(() => {
         seconds < count && setSeconds((prevSeconds) => prevSeconds + 1);
      }, 50);

      return () => clearTimeout(timer);
    }, [seconds]);

  return (
    <>
    <div className="flex justify-center items-center text-white flex-col mt-10 lg:mt-0" data-aos="zoom-in">
              <div className=" bg-slate-600 flex justify-center items-center rounded-full  w-20 h-20 text-3xl text-blue-400 mb-2" >
              {percent ? '%' : '+'}
                {seconds}
              </div>
              <div className="text-lg font-semibold">
              
                {title}
              </div>
            </div>
    </>
  )
}
export default CounterItems