// import React from 'react'
// import herofinal from '../assets/herofinal.PNG'
// import { useState } from 'react'
// import { IoSearchSharp } from "react-icons/io5";
// export default function Hero() {
//    const [activeButton,setActiveButton] = useState("BUY");
//    const buttons =  ["BUY",'SELL','RENT','AGENTS','OFFICES']
//   return (
//     <div className='h-[720px] w-full relative mb-4'>
//       <img src={herofinal} className='object-cover  absolute inset-0 w-full h-full '/>

//       <div className='relative z-10 flex justify-center items-center pt-[260px] pb-6'>
//         <h1 className='text-white font-semibold text-[33px] tracking tracking-widest mt-16'>
//         WHEN HOME MATTERS MOST, GO WITH THE MOST TRUSTED.</h1>
//       </div>
//       <div className='flex flex-col gap-0.5 w-[700px]'>
//         <div className='relative z-10 flex flex-row justify-center items-center mt-6 gap-0 bg-rose-500  ml-[660px] w-[600px]'>
//       {buttons.map((btn)=>(

//         <button key={btn}
//          className={` font-semibold w-[120px] text-[19px]  duration-300 ease-in-out transition-colors   px-4 py-2
//            ${activeButton === btn? " bg-blue-800 text-white" :"bg-neutral-200 text-black "}`}
//            onClick={()=>{setActiveButton(btn)}}>
//            {btn}
//            </button>
//       ))}

//       <div></div>
//       </div>
    
//       <div className="flex items-center relative z-10 ml-[660px] w-[600px] h-[40px] bg-white rounded-md shadow-md">
//   {/* Input field with full width */}
//   <form className="flex-1">
//     <input
//       className="w-full h-full text-neutral-800 pl-2 outline-none"
//       placeholder="Address, City, ZIP And More..."
//     />
//   </form>

//   {/* Search Button on the Right */}
//   <button className="w-[50px] h-full bg-rose-600 flex items-center justify-center">
//     <IoSearchSharp className="text-white" fontSize={24} />
//   </button>
// </div>

//       </div>
//     </div>
    
//   )
// }

import React, { useState } from 'react';
import herofinal from '../assets/herofinal.PNG';
import { IoSearchSharp } from "react-icons/io5";

export default function Hero() {
  const [activeButton, setActiveButton] = useState("BUY");
  const buttons = ["BUY", "SELL", "RENT", "AGENTS", "OFFICES"];

  return (
    <div className="h-[720px] w-full relative mb-4">
      <img
        src={herofinal}
        className="object-cover absolute inset-0 w-full h-full"
        alt="Hero"
      />

      {/* Hero Heading */}
      <div className="relative z-10 flex justify-center items-center pt-[260px] pb-6 px-4 text-center">
        <h1 className="text-white font-semibold text-[20px] md:text-[33px] tracking-widest max-w-4xl">
          WHEN HOME MATTERS MOST, GO WITH THE MOST TRUSTED.
        </h1>
      </div>

      {/* Buttons + Search */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        
        {/* Buttons - Responsive but spacing preserved */}
        <div className="flex flex-wrap justify-center  w-[600px] max-w-full">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={`w-[120px] text-[19px] font-semibold px-4 py-2 transition-colors duration-300 
              ${activeButton === btn ? "bg-blue-800 text-white" : "bg-neutral-200 text-black"}`}
              onClick={() => setActiveButton(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-[600px] max-w-full h-[40px] bg-white rounded-md shadow-md mt-2">
          <form className="flex-1">
            <input
              className="w-full h-full text-neutral-800 pl-2 outline-none text-sm"
              placeholder="Address, City, ZIP And More..."
            />
          </form>
          <button className="w-[50px] h-full bg-rose-600 flex items-center justify-center">
            <IoSearchSharp className="text-white" fontSize={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
