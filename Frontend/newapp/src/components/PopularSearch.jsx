// import React from "react";
// import hero from "../assets/hero.jpg";
// import home from "../assets/home.jpg";
// import homeimg from '../assets/homeimg.jpeg';
// import home7 from'../assets/home7.webp'
// import home4 from'../assets/home4.jpg'
// import openhouse from '../assets/openhouse.jpg'
// import imgtobeused from '../assets/imgtobeused.jpg'
// import farmhouse from '../assets/farmhouse.jpg'
// export default function PopularSearch() {
//   return (
//     <>
//       <div className=" mt-[100px] min-h-screen">
//         <div className="flex justify-center items-center">
//           <h1 className="text-[32px] text-neutral-700 font-medium font-montserrat text-center tracking-[.10em] space-x-[10px]">
//             Popular Searches Nearby
//           </h1>
//         </div>

//         <div className="mt-12 flex flex-col gap-12">
//           <div className="flex flex-row justify-center items-center gap-8 mx-10 ">
//             <div className="flex flex-col gap-1">
//               <img src={homeimg} className="h-[230px] w-[368px] rounded-[8px] object-cover" />
//               <h1 className="text-[24px]  text-neutral-600 font-medium font-montserrat text-center tracking-[.10em]">
//                 New Listings
//               </h1>
//             </div>
//             <div className="flex flex-col gap-4">
//               <img src={farmhouse} className="h-[230px] w-[368px] rounded-[8px] object-cover" />
//               <h1 className="text-[24px]  text-neutral-600 font-medium font-montserrat text-center tracking-[.10em]">
//                 Farm Houses
//               </h1>
//             </div>
//             <div className="flex flex-col gap-4">
//               <img src={home} className="h-[230px] w-[368px] rounded-[8px] object-cover" />
//               <h1 className="text-[24px]  text-neutral-600 font-medium font-montserrat text-center tracking-[.10em]">
//                 Luxury Homes
//               </h1>
//             </div>
//           </div>
//           <div className="flex flex-row  justify-center items-center gap-8  mx-10">
//             <div className="flex flex-col gap-4">
//               <img src={imgtobeused} className="h-[230px] w-[368px] rounded-[8px] object-cover" />
//               <h1 className="text-[24px]  text-neutral-600 font-medium font-montserrat text-center tracking-[.10em]">
//               Villas
//               </h1>
//             </div>
//             <div className="flex flex-col gap-4">
//               <img src={openhouse} className="h-[230px] w-[368px] rounded-[8px] object-cover" />
//               <h1 className="text-[24px]  text-neutral-600 font-medium font-montserrat text-center tracking-[.10em]">
//                 Open Houses
//               </h1>
//             </div>
//             <div className="flex flex-col gap-4">
//               <img src={home4} className="h-[230px] w-[368px] rounded-[8px] object-cover" />
//               <h1 className="text-[24px]  text-neutral-600 font-medium font-montserrat text-center tracking-[.10em]">
//                Hidden Treasures
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import home from "../assets/home.jpg";
import homeimg from "../assets/homeimg.jpeg";
import home7 from "../assets/home7.webp";
import home4 from "../assets/home4.jpg";
import openhouse from "../assets/openhouse.jpg";
import imgtobeused from "../assets/imgtobeused.jpg";
import farmhouse from "../assets/farmhouse.jpg";

export default function PopularSearch() {
  const items = [
    { title: "New Listings", img: homeimg },
    { title: "Farm Houses", img: farmhouse },
    { title: "Luxury Homes", img: home },
    { title: "Villas", img: imgtobeused },
    { title: "Open Houses", img: openhouse },
    { title: "Hidden Treasures", img: home4 },
  ];

  return (
    <div className="mt-[100px] px-4 font-montserrat">
      {/* 🏷️ Heading */}
      <div className="flex justify-center items-center">
        <h1 className="text-[32px] text-neutral-700 font-medium tracking-[.10em] text-center">
          Popular Searches Nearby
        </h1>
      </div>

      {/* 📸 Image Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[230px] rounded-[8px] object-cover"
            />
            <h1 className="text-[24px] text-neutral-600 font-medium tracking-[.10em] text-center">
              {item.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

