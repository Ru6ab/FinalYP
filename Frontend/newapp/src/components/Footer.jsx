// import React from "react";
// import logo1 from "../assets/logo1.png";
// import logo2 from "../assets/logo2.png";
// import { FaFacebookF } from "react-icons/fa";
// import { BsTwitterX } from "react-icons/bs";
// import { FaPinterest } from "react-icons/fa";
// import { RiLinkedinFill } from "react-icons/ri";
// export default function Footer() {
//   return (
//     <>
//       {/* //white portion */}
//       <div className="h-[350px]  mt-10  flex flex-col gap-10">
//         <h1 className="text-neutral-800 mt-8 text-[25px] font-bold tracking-widest ml-[200px]">Popular Real Estate Searches</h1>
//         <div className="flex flex-row ml-[200px] gap-[200px]">
//           <div className="flex flex-col leading-loose gap-3">
//             <a><p className="text-[18px] text-blue-700 tracking-widest">New Listings Near Me</p></a>
//             <a><p className="text-[18px] text-blue-700 tracking-widest">Homes For Sale Near Me</p></a>
//             <a><p className="text-[18px] text-blue-700 tracking-widest">Price Reductions Near Me</p></a> 
//           </div>

//           <div className="flex flex-col leading-loose">
//             <a><p className="text-[18px] text-blue-700 tracking-widest">Luxury Homes</p></a>
//             <a><p className="text-[18px] text-blue-700 tracking-widest">Open Houses Near Me</p></a>
//           </div>

//           <div>
//           <a><p className="text-[18px] text-blue-700 tracking-widest leading-loose">Luxury Homes</p></a>
//           </div>

//         </div>
//       </div>

//       <div className="flex flex-col h-[420px] bg-blue-900 px-3 pb-4">
//         <div className="h-[190px] mt-6 flex flex-row justify-around items-center text-white">
//           <div className="flex flex-col gap-3">
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               NEWEST LISTINGS
//             </h1>
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               EXCLUSIVE OFFERS
//             </h1>
//           </div>
//           <div className="flex flex-col gap-3">
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               LUXURY
//             </h1>
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               NEW LISTINGS
//             </h1>
//           </div>

//           <div className="flex flex-col gap-3">
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               SPONSORED PROPERTIES
//             </h1>
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               OUR PARTNERS
//             </h1>
//           </div>

//           <div className="flex flex-col gap-3">
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               INDUSTRY TERMS
//             </h1>
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               GLOSSARY OF REAL ESTATE
//             </h1>
//             <h1 className="tracking-widest font-semibold text-[14px]">
//               LEADERSHIIP
//             </h1>
//           </div>
//         </div>
//         {/* <div className="relative border-[1px] border-x-white"/>
//         <div className=" flex justify-center"><h1 className="absolute z-10 text-white font-semibold tracking-widest">Our Family of Brands</h1></div>
//         */}
//         <div className="relative mt-16">
//           <div className="relative border-t-[1px] border-neutral-300 mx-3">
//             <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 px-4 text-white font-semibold tracking-widest">
//               Our Family of Brands
//             </h1>
//           </div>
//         </div>

//         <div className="flex flex-row justify-center items-center gap-6 ">
//           <img src={logo1} className="h-[100px] w-[100px]" />
//           <img src={logo2} className="h-[130px] w-[100px]" />
//         </div>
//         <div className="flex flex-row justify-between items-end text-white">
//           <div>
//             <p className="text-[15px] leading-6">
//               Each office independently owned and operated.
//               <br />
//               RE/MAX, LLC is an Equal Opportunity Employer and supports the Fair
//               Housing Act and equal opportunity housing.
//               <br />
//               If you have a disability that is preventing you from experiencing
//               this website, call (800) 525-7452.
//               <br />© 2025 RE/MAX, LLC. All Rights Reserved.
//             </p>
//           </div>
//           <div className="flex flex-col gap-3">
//             <div className="flex flex-row justify-evenly items-center ">
//               <FaFacebookF fontSize={21} className="text-white" />
//               <RiLinkedinFill fontSize={21} className="text-white" />
//               <FaPinterest fontSize={21} className="text-white" />
//               <BsTwitterX fontSize={21} className="text-white" />
//             </div>
//             <div className="flex flex-row gap-3 text-white font-semibold">
//               <h1>PRIVACY NOTICE </h1>
//               <h1>TERMS OF USE</h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";

export default function Footer() {
  return (
    <>
      {/* White Section */}
      <div className="mt-10 px-6 md:px-20 flex flex-col gap-10">
        <h1 className="text-neutral-800 text-[22px] md:text-[25px] font-bold tracking-widest">
          Popular Real Estate Searches
        </h1>
        <div className="flex flex-col md:flex-row gap-10 md:gap-32">
          <div className="flex flex-col leading-loose gap-2">
            <a><p className="text-[16px] md:text-[18px] text-blue-700 tracking-widest">New Listings Near Me</p></a>
            <a><p className="text-[16px] md:text-[18px] text-blue-700 tracking-widest">Homes For Sale Near Me</p></a>
            <a><p className="text-[16px] md:text-[18px] text-blue-700 tracking-widest">Price Reductions Near Me</p></a> 
          </div>
          <div className="flex flex-col leading-loose gap-2">
            <a><p className="text-[16px] md:text-[18px] text-blue-700 tracking-widest">Luxury Homes</p></a>
            <a><p className="text-[16px] md:text-[18px] text-blue-700 tracking-widest">Open Houses Near Me</p></a>
          </div>
          <div>
            <a><p className="text-[16px] md:text-[18px] text-blue-700 tracking-widest leading-loose">Luxury Homes</p></a>
          </div>
        </div>
      </div>

      {/* Blue Section */}
      <div className="flex flex-col bg-blue-900 px-6 md:px-10 pb-8 pt-10 mt-10">
        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 text-white text-[13px] md:text-[14px] font-semibold tracking-widest">
          <div className="flex flex-col gap-3">
            <h1>NEWEST LISTINGS</h1>
            <h1>EXCLUSIVE OFFERS</h1>
          </div>
          <div className="flex flex-col gap-3">
            <h1>LUXURY</h1>
            <h1>NEW LISTINGS</h1>
          </div>
          <div className="flex flex-col gap-3">
            <h1>SPONSORED PROPERTIES</h1>
            <h1>OUR PARTNERS</h1>
          </div>
          <div className="flex flex-col gap-3">
            <h1>INDUSTRY TERMS</h1>
            <h1>GLOSSARY OF REAL ESTATE</h1>
            <h1>LEADERSHIP</h1>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-10">
          <div className="border-t border-neutral-300 w-full" />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 px-4 text-white font-semibold tracking-widest">
            Our Family of Brands
          </h1>
        </div>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          <img src={logo1} className="h-[80px] w-[80px] md:h-[100px] md:w-[100px]" />
          <img src={logo2} className="h-[110px] w-[90px] md:h-[130px] md:w-[100px]" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white gap-6">
          <div className="text-center md:text-left text-[13px] md:text-[15px] leading-6">
            <p>
              Each office independently owned and operated.
              <br />
              RE/MAX, LLC is an Equal Opportunity Employer and supports the Fair
              Housing Act and equal opportunity housing.
              <br />
              If you have a disability that is preventing you from experiencing
              this website, call (800) 525-7452.
              <br />© 2025 RE/MAX, LLC. All Rights Reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-row gap-4">
              <FaFacebookF fontSize={20} />
              <RiLinkedinFill fontSize={20} />
              <FaPinterest fontSize={20} />
              <BsTwitterX fontSize={20} />
            </div>
            <div className="flex flex-row gap-3 text-sm font-semibold">
              <h1>PRIVACY NOTICE</h1>
              <h1>TERMS OF USE</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
