import React from 'react'

import Hero from '../components/Hero'
import PopularSearch from '../components/PopularSearch'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SplitSection from '../components/SplitSection'
import HowItWorks from '../components/HowItWorks'
import LatestListings from '../components/LatestListing'
export default function Home() {
  return (
    <>
    <div  className='z-[9999] relative'>

      <Navbar/>
      
      <div className='overflow-x-hidden'>
     <Hero/>      
      <PopularSearch/>
       <LatestListings title="Recent for Rent" query="type=rent" viewAllTo="/search?type=rent" bg="bg-slate-50" />
      <LatestListings title="Recent for Sale" query="type=sale" viewAllTo="/search?type=sale" />
      <SplitSection/>
      <HowItWorks/>     
      <Footer/></div>
     </div>
    
  </>
   
  )
}
