import React from 'react'
import Typewriter from "typewriter-effect";
function PageLoader() {
  return (
    <div className='absolute w-full h-[100vh] top-0 left-0 flex justify-center items-center font-semibold text-3xl flex-col  bg-slate-800 text-white z-[99999999]'>
      {/* <img className='w-[300px] loader' src="./loader/loader.png" alt="" /> */}
      <video className='w-[300px]' loop  src="./loader/loo.avi"></video>
      <h1 className='text-gray-400'>
      <Typewriter
                options={{
                 loop:true
                }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('Loading ...')
                      .pauseFor(2000)
                      .start();
                  }}
                  
                />
      </h1>
    </div>
  )
}

export default PageLoader