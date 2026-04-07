// import React from "react";
// import logo1 from "../assets/logo1.png";
// import logo2 from "../assets/logo2.png";
// import { FaFacebookF } from "react-icons/fa";
// import { BsTwitterX } from "react-icons/bs";
// import { FaPinterest } from "react-icons/fa";
// import { RiLinkedinFill } from "react-icons/ri";

// export default function FooterBlue() {
//   return (
//     <div className="flex flex-col h-[420px] bg-blue-900 px-3 pb-4">
//            <div className="h-[190px] mt-6 flex flex-row justify-around items-center text-white">
//              <div className="flex flex-col gap-3">
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  NEWEST LISTINGS
//                </h1>
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  EXCLUSIVE OFFERS
//                </h1>
//              </div>
//              <div className="flex flex-col gap-3">
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  LUXURY
//                </h1>
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  NEW LISTINGS
//                </h1>
//              </div>
   
//              <div className="flex flex-col gap-3">
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  SPONSORED PROPERTIES
//                </h1>
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  OUR PARTNERS
//                </h1>
//              </div>
   
//              <div className="flex flex-col gap-3">
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  INDUSTRY TERMS
//                </h1>
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  GLOSSARY OF REAL ESTATE
//                </h1>
//                <h1 className="tracking-widest font-semibold text-[14px]">
//                  LEADERSHIIP
//                </h1>
//              </div>
//            </div>
//            {/* <div className="relative border-[1px] border-x-white"/>
//            <div className=" flex justify-center"><h1 className="absolute z-10 text-white font-semibold tracking-widest">Our Family of Brands</h1></div>
//            */}
//            <div className="relative mt-16">
//              <div className="relative border-t-[1px] border-neutral-300 mx-3">
//                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 px-4 text-white font-semibold tracking-widest">
//                  Our Family of Brands
//                </h1>
//              </div>
//            </div>
   
//            <div className="flex flex-row justify-center items-center gap-6 ">
//              <img src={logo1} className="h-[100px] w-[100px]" />
//              <img src={logo2} className="h-[130px] w-[100px]" />
//            </div>
//            <div className="flex flex-row justify-between items-end text-white">
//              <div>
//                <p className="text-[15px] leading-6">
//                  Each office independently owned and operated.
//                  <br />
//                  RE/MAX, LLC is an Equal Opportunity Employer and supports the Fair
//                  Housing Act and equal opportunity housing.
//                  <br />
//                  If you have a disability that is preventing you from experiencing
//                  this website, call (800) 525-7452.
//                  <br />© 2025 RE/MAX, LLC. All Rights Reserved.
//                </p>
//              </div>
//              <div className="flex flex-col gap-3">
//                <div className="flex flex-row justify-evenly items-center ">
//                  <FaFacebookF fontSize={21} className="text-white" />
//                  <RiLinkedinFill fontSize={21} className="text-white" />
//                  <FaPinterest fontSize={21} className="text-white" />
//                  <BsTwitterX fontSize={21} className="text-white" />
//                </div>
//                <div className="flex flex-row gap-3 text-white font-semibold">
//                  <h1>PRIVACY NOTICE </h1>
//                  <h1>TERMS OF USE</h1>
//                </div>
//              </div>
//            </div>
//          </div>
//   )
// }

import React from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";

export default function FooterBlue() {
  return (
    <div className="flex flex-col w-full bg-blue-900 px-4 py-6 text-white">
      {/* Top Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="tracking-widest font-semibold text-sm">NEWEST LISTINGS</h1>
          <h1 className="tracking-widest font-semibold text-sm">EXCLUSIVE OFFERS</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="tracking-widest font-semibold text-sm">LUXURY</h1>
          <h1 className="tracking-widest font-semibold text-sm">NEW LISTINGS</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="tracking-widest font-semibold text-sm">SPONSORED PROPERTIES</h1>
          <h1 className="tracking-widest font-semibold text-sm">OUR PARTNERS</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="tracking-widest font-semibold text-sm">INDUSTRY TERMS</h1>
          <h1 className="tracking-widest font-semibold text-sm">GLOSSARY OF REAL ESTATE</h1>
          <h1 className="tracking-widest font-semibold text-sm">LEADERSHIP</h1>
        </div>
      </div>

      {/* Divider Title */}
      <div className="relative mb-6">
        <div className="border-t border-neutral-300 w-full"></div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 px-4 font-semibold tracking-widest text-sm">
          Our Family of Brands
        </h1>
      </div>

      {/* Logos */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <img src={logo1} className="h-[100px] w-[100px] object-contain" />
        <img src={logo2} className="h-[130px] w-[100px] object-contain" />
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="text-sm leading-6 max-w-xl">
          <p>
            Each office independently owned and operated.
            <br />
            RE/MAX, LLC is an Equal Opportunity Employer and supports the Fair Housing Act and equal opportunity housing.
            <br />
            If you have a disability that is preventing you from experiencing this website, call (800) 525-7452.
            <br />
            © 2025 RE/MAX, LLC. All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <FaFacebookF fontSize={21} />
            <RiLinkedinFill fontSize={21} />
            <FaPinterest fontSize={21} />
            <BsTwitterX fontSize={21} />
          </div>
          <div className="flex flex-wrap gap-4 font-semibold text-sm">
            <h1>PRIVACY NOTICE</h1>
            <h1>TERMS OF USE</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
