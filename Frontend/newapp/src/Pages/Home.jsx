import React from 'react'

import Hero from '../components/Hero'
import AfterHero from '../components/AfterHero'
import PopularSearch from '../components/PopularSearch'
import home6 from '../assets/home6.jpg'
import ImgComp from '../components/ImgComp'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
  return (
    <>
    <div  className='z-[9999] relative'>

      <Navbar/>
      
      <div className='overflow-x-hidden'>
     <Hero/>
      <AfterHero/>
      <PopularSearch/>
      <ImgComp/>
      <Footer/></div>
     </div>
    
  </>
   
  )
}
