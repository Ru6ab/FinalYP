// import React from "react";
// import Footer from "../components/Footer";
// import FooterBlue from "../components/FooterBlue";

// export default function About() {
//   return (
//     <div className="flex flex-col pt-4">
//       <div className="leading-none flex flex-col justify-center items-center border-b-[2px] border-rose-600 pb-4">
//         <h1 className="  font-mono text-[20px] text-rose-600 font-bold">
//           RealEstate
//         </h1>
//         <p className="font-mono text-[18px] text-blue-800 tracking-widest font-bold">
//           RealResults
//         </p>
//       </div>

//       <div className="mx-[250px] border-neutral-300 max-w-[1300px] border-b-[1px]">
//         {" "}
//         <h1 className="my-8  tracking-wider font-montserrat text-center font-semibold text-[34px] text-neutral-700 ">
//           About Us
//         </h1>{" "}
//       </div>

//       <div className="flex flex-col mx-[250px] ">
//         <div className="flex flex-col">
//           <h1 className="text-[18px] tracking-wider text-neutral-800 font-semibold pt-16 pb-2">
//             RealEstateRealResults Difference
//           </h1>
//           <p className="max-w-[1260px] text-neutral-800 font-poppins tracking-wider text-[17px] leading-7 font-light  mb-5">
//             Our search, content, and advertising strategies are designed to
//             bring millions of transaction-ready buyers and sellers to Homes.com,
//             where they can find a great agent, or connect to their current one
//             and collaborate during the entire process.
//           </p>
//           <p className=" max-w-[1260px] text-neutral-800 font-poppins tracking-wider text-[17px] leading-7 font-light">
//             We offer a full line of advertising products and online marketing
//             services designed to help real estate professionals connect with
//             interested buyers and sellers. If your goals include connecting with
//             quality buyers and sellers searching for their next home and
//             leveraging the right tools and services to grow your business,
//             you’ve come to the right place! Homes.com has tons of resources to
//             help you stay informed of what’s happening in the industry, what’s
//             working for successful agents, and what tactics are leading to
//             success in today’s market.
//           </p>
//         </div>
//         <div className="flex flex-col">
//           <h1 className="text-[18px] tracking-wider text-neutral-900 font-semibold pt-6 pb-2">
//           Interested in Joining Our Team?
//           </h1>
//           <p className="max-w-[1260px] text-neutral-800 font-poppins tracking-wider text-[17px] leading-7 font-light  mb-4">
//             We believe our success is derived from hard work, dedication, and
//             talent. We are committed to providing our customers with exceptional
//             service and user-friendly, innovative tools – never settling for
//             less, always striving to be the best.
//           </p>
//           <p className="max-w-[1260px] text-neutral-800 font-poppins tracking-wider text-[17px] leading-7 font-light mb-4">We are always looking to hire hard-working and talented people in sales, marketing, project management, and technology positions.</p>
//           <p className=" max-w-[1260px] text-neutral-800 font-poppins tracking-wider text-[17px] leading-7 font-light">
//             If you want to join an innovative, fast-paced and forward-thinking
//             company, then Homes.com is your place to grow. Homes.com offers a
//             robust benefits package through its parent company CoStar Group,
//             with comprehensive medical benefits, competitive 401K plan, flexible
//             spending option, and a variety of wellness programs.
//           </p>
//         </div>
//         <div className="flex justify-center items-center mt-3">
//           <button className="bg-blue-900 text-white font-semibold rounded-[6px] py-2 px-10 tracking-wide text-[17px] font-poppins">Join Careers</button>
//         </div>
       
//       </div>
//       <div className="mt-20">
//         <FooterBlue/>
//         </div>
//     </div>
//   );
// }

import React from "react";
import Footer from "../components/Footer";
import FooterBlue from "../components/FooterBlue";
import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div className="flex flex-col ">
      {/* Header */}
    <Navbar/>

      {/* Title Section */}
      <div className=" mt-20 w-full border-b border-neutral-300 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
        <h1 className="my-8 tracking-wider font-montserrat text-center font-semibold text-2xl sm:text-3xl md:text-4xl text-neutral-700">
          About Us
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 max-w-screen-xl mx-auto">
        {/* Section 1 */}
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl md:text-2xl tracking-wider text-neutral-800 font-semibold pt-16 pb-2">
            RealEstateRealResults Difference
          </h2>
          <p className="text-neutral-800 font-poppins tracking-wide text-base sm:text-[17px] leading-7 font-light mb-5">
            Our search, content, and advertising strategies are designed to
            bring millions of transaction-ready buyers and sellers to Homes.com,
            where they can find a great agent, or connect to their current one
            and collaborate during the entire process.
          </p>
          <p className="text-neutral-800 font-poppins tracking-wide text-base sm:text-[17px] leading-7 font-light">
            We offer a full line of advertising products and online marketing
            services designed to help real estate professionals connect with
            interested buyers and sellers. If your goals include connecting with
            quality buyers and sellers searching for their next home and
            leveraging the right tools and services to grow your business,
            you’ve come to the right place! Homes.com has tons of resources to
            help you stay informed of what’s happening in the industry, what’s
            working for successful agents, and what tactics are leading to
            success in today’s market.
          </p>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl md:text-2xl tracking-wider text-neutral-900 font-semibold pt-8 pb-2">
            Interested in Joining Our Team?
          </h2>
          <p className="text-neutral-800 font-poppins tracking-wide text-base sm:text-[17px] leading-7 font-light mb-4">
            We believe our success is derived from hard work, dedication, and
            talent. We are committed to providing our customers with exceptional
            service and user-friendly, innovative tools – never settling for
            less, always striving to be the best.
          </p>
          <p className="text-neutral-800 font-poppins tracking-wide text-base sm:text-[17px] leading-7 font-light mb-4">
            We are always looking to hire hard-working and talented people in
            sales, marketing, project management, and technology positions.
          </p>
          <p className="text-neutral-800 font-poppins tracking-wide text-base sm:text-[17px] leading-7 font-light">
            If you want to join an innovative, fast-paced and forward-thinking
            company, then Homes.com is your place to grow. Homes.com offers a
            robust benefits package through its parent company CoStar Group,
            with comprehensive medical benefits, competitive 401K plan, flexible
            spending option, and a variety of wellness programs.
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-center items-center mt-5">
          <button className="bg-blue-900 text-white font-semibold rounded-md py-2 px-6 tracking-wide text-base sm:text-lg font-poppins hover:bg-blue-800 transition duration-300">
            Join Careers
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20">
        <FooterBlue />
      </div>
    </div>
  );
}
