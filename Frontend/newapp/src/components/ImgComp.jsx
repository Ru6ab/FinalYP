// import React from 'react'
// import home6 from '../assets/home6.jpg'
// import home7 from '../assets/home7.webp'
// import cityview from '../assets/cityview.jpg'
// import imgtobeused from '../assets/imgtobeused.jpg'
// import villaImg1 from '../assets/villaImg1.jpg'
// export default function ImgComp() {
//   return (
//    <div>
//      <div className="relative  w-full h-[402px] ">
//    {/* Background Image */}
//    <img 
//      src={cityview} 
//      alt="Background"
//      className="absolute  object-cover w-full h-full  "
//    />\


//    {/* Blue Color Overlay */}
//    <div className="absolute inset-0 bg-neutral-100 opacity-50"></div>

//    {/* Content */}
//    <div className="relative z-10 flex flex-col   justify-center items-end mr-[200px] h-full text-white">
//      <h1 className="text-[40px] font-bold tracking tracking-wider  text-neutral-600">
//        Worldwide
//      </h1>
//      <div className='pt-2 border-b-[3px] border-rose-600 h-[7px] w-full mr-[12px] max-w-[190px]'/>
//      <p className="mt-4 text-[22px] text-neutral-600 font-semibold tracking-wide ">
//        One World. One Search.
//      </p>
//    </div>
//  </div>
//  <div className="relative mt-[2px]  w-full h-[402px] ">
//  {/* Background Image */} 
//  <img 
//    src={imgtobeused} 
//    alt="Background"
//    className="absolute  object-cover  w-full h-full  " 
//  />

//  {/* Blue Color Overlay */}
//  <div className="absolute inset-0 bg-slate-800 opacity-50"></div>

//  {/* Content */}
//  <div className="relative z-10 flex flex-col justify-start  pl-[200px] h-full text-white pt-[190px]">
//    <h1 className="text-4xl font-bold pl-12">
//      Commercial
//    </h1>
//    <div className='pt-2 border-b-[3px] border-rose-600 h-[2px] w-full ml-20 max-w-[160px]'/>
//    <h1 className="mt-5 mb-4 pl-8 text-[18px] font-semibold tracking-wider">
//      Commercial with confidence
//    </h1>
//    <button className=' h-[35px] w-[330px] border-neutral-100 border-[3px] tracking-widest font-semibold text-[14px] p-1 flex items-center justify-center'>EXPLORE COMMERCIAL REAL ESTATE</button>
//  </div>
// </div>


// <div className="relative mt-[2px]  w-full h-[402px] ">
//  {/* Background Image */}
//  <img 
//    src={villaImg1} 
//    alt="Background"
//    className="absolute object-cover w-full h-full  "
//  />

//  {/* Blue Color Overlay */}
//  <div className="absolute inset-0 bg-slate-800 opacity-50"></div>

//  {/* Content */}
//  <div className="relative z-10 flex flex-col justify-center items-end  pr-[300px] h-full text-white pt-[110px]">
//    <h1 className="text-4xl font-bold pr-20">
//      Luxury
//    </h1>
//    <div className='pt-2 mr-20 border-b-[3px] border-rose-600 h-[2px] w-full  max-w-[100px]'/>
//    <h1 className="mt-5 mb-6  text-[18px] font-semibold tracking-wider">
//      Find Homes & Luxury Properties
//    </h1>
//    <div className='pr-16'> <button className='flex items-center justify-center h-[32px] w-[165px] border-neutral-100 border-[3px] tracking-widest font-semibold text-[14px] p-1 '>DISCOVER LUXURY</button>
//    </div>
//    </div>
// </div>
// </div>
      
    
//   )
// }

import React from "react";
import home6 from "../assets/home6.jpg";
import home7 from "../assets/home7.webp";
import cityview from "../assets/cityview.jpg";
import imgtobeused from "../assets/imgtobeused.jpg";
import villaImg1 from "../assets/villaImg1.jpg";

export default function ImgComp() {
  return (
    <div className="w-full">
      {/* Section 1 - Worldwide */}
      <div className="relative w-full h-[402px]">
        <img src={cityview} alt="Background" className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-neutral-100 opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-end h-full px-6 md:px-[100px] lg:px-[200px] text-neutral-600">
          <h1 className="text-[32px] md:text-[40px] font-bold tracking-wider">Worldwide</h1>
          <div className="pt-2 border-b-[3px] border-rose-600 h-[7px] w-full max-w-[190px] mr-2" />
          <p className="mt-4 text-[18px] md:text-[22px] font-semibold tracking-wide">
            One World. One Search.
          </p>
        </div>
      </div>

      {/* Section 2 - Commercial */}
      <div className="relative w-full h-[402px] mt-[2px]">
        <img src={imgtobeused} alt="Background" className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-start h-full px-6 md:px-[100px] lg:px-[200px] pt-[160px] text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Commercial</h1>
          <div className="pt-2 border-b-[3px] border-rose-600 h-[2px] w-full max-w-[160px] mt-1 mb-3" />
          <h1 className="text-[16px] md:text-[18px] font-semibold tracking-wider mb-3">
            Commercial with confidence
          </h1>
          <button className="w-full max-w-[330px] border-[3px] border-white text-white text-[14px] tracking-widest font-semibold p-2">
            EXPLORE COMMERCIAL REAL ESTATE
          </button>
        </div>
      </div>

      {/* Section 3 - Luxury */}
      <div className="relative w-full h-[402px] mt-[2px]">
        <img src={villaImg1} alt="Background" className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-end h-full px-6 md:px-[100px] lg:px-[200px] text-white pt-[100px]">
          <h1 className="text-3xl md:text-4xl font-bold pr-2">Luxury</h1>
          <div className="pt-2 border-b-[3px] border-rose-600 h-[2px] w-full max-w-[100px] mr-2" />
          <h1 className="text-[16px] md:text-[18px] font-semibold tracking-wider mt-4 mb-4 text-right">
            Find Homes & Luxury Properties
          </h1>
          <div className="">
            <button className="w-full max-w-[165px] border-[3px] border-white text-white text-[14px] tracking-widest font-semibold p-1">
              DISCOVER LUXURY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
