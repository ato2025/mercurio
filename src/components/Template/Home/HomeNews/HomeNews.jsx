import React from 'react'
import SectionsTitle from '../../../modules/SectionsTitle/SectionsTitle'
import { Link } from 'react-router-dom'

function HomeNews() {
   const news=[
      {title:'New Drilling Method Opens Vast Oil Fields In Us',date:'June 22, 2022',img:'./news/news1.jpg', aos:'fade-down'},
      {title:'USGS downgrades oil, gas estimates for Monterey formation, San Joaquin basin',date:'June 18, 2022',img:'./news/news2.jpg', aos:'fade-up'},
      {title:'Demanding ‘Big Oil’ pay its fair  share',date:'June 18, 2022',img:'./news/news3.jpg', aos:'fade-down'},
   ]
  return (
    <div className='bg-slate-900 py-9'>
      <SectionsTitle title={'News'} />
<div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto py-16 rounded-3xl px-16'>
   {
      news.map((news,index)=>(
         <Link key={index} className='mx-auto w-72 my-5 px-5 newsBox  t07 hover:-translate-y-5 rounded-lg' data-aos={news.aos}>
            <img src={news.img} className='rounded-md my-5' alt="" />
            <h2 className='text-white my-5 text-lg font-semibold'>
               {news.title}
            </h2>
         </Link>
      ))
   }
</div>
    </div>
  )
}

export default HomeNews