import React, { useEffect } from 'react'

function PageBgLayout({title,height,img:MobileImg,DesktopImg}) {
  useEffect(()=>{
    document.title = title
  },[])
  return (
       <div className={`w-full ${height} relative`}>
        <picture className={`w-full ${height} absolute top-0 left-0`}>
            <source srcSet={MobileImg} media="(max-width: 767px)"/>
            <source srcSet={DesktopImg} media="(min-width: 768px)"/>
            <img src={DesktopImg} alt="" className="w-full h-full" />
            </picture>
       {/* <img src={img} className='w-full h-full' alt="" /> */}
       <div className='w-full h-full absolute top-0 left-0 text-white flex justify-center items-center text-6xl font-semibold tracking-wider pageBgLayout'>
         {title}
       </div>
     </div>
  )
}

export default PageBgLayout