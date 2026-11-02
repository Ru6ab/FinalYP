

// import React, { useState } from 'react';
// import herofinal from '../assets/herofinal.PNG';
// import { IoSearchSharp } from "react-icons/io5";

// export default function Hero() {
//   const [activeButton, setActiveButton] = useState("BUY");
//   const buttons = ["BUY", "SELL", "RENT", "AGENTS", "OFFICES"];

//   return (
//     <div className="h-[720px] w-full relative mb-4">
//       <img
//         src={herofinal}
//         className="object-cover absolute inset-0 w-full h-full"
//         alt="Hero"
//       />

//       {/* Hero Heading */}
//       <div className="relative z-10 flex justify-center items-center pt-[260px] pb-6 px-4 text-center">
//         <h1 className="text-white font-semibold text-[20px] md:text-[33px] tracking-widest max-w-4xl">
//           WHEN HOME MATTERS MOST, GO WITH THE MOST TRUSTED.
//         </h1>
//       </div>

//       {/* Buttons + Search */}
//       <div className="relative z-10 flex flex-col items-center w-full px-4">
        
//         {/* Buttons - Responsive but spacing preserved */}
//         <div className="flex flex-wrap justify-center  w-[600px] max-w-full">
//           {buttons.map((btn) => (
//             <button
//               key={btn}
//               className={`w-[120px] text-[19px] font-semibold px-4 py-2 transition-colors duration-300 
//               ${activeButton === btn ? "bg-blue-800 text-white" : "bg-neutral-200 text-black"}`}
//               onClick={() => setActiveButton(btn)}
//             >
//               {btn}
//             </button>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="flex items-center w-[600px] max-w-full h-[40px] bg-white rounded-md shadow-md mt-2">
//           <form className="flex-1">
//             <input
//               className="w-full h-full text-neutral-800 pl-2 outline-none text-sm"
//               placeholder="Address, City, ZIP And More..."
//             />
//           </form>
//           <button className="w-[50px] h-full bg-rose-600 flex items-center justify-center">
//             <IoSearchSharp className="text-white" fontSize={22} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import herofinal from "../assets/herofinal.PNG";
import { useAuthModal } from "./AuthModalProvider";

const buttons = ["BUY", "SELL", "RENT"];

export default function Hero() {
  const [activeButton, setActiveButton] = useState("SELL");
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((s) => s.user);
  const { openSignin } = useAuthModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", activeButton === "RENT" ? "rent" : "sale");
    if (term.trim()) params.set("searchTerm", term.trim());
    navigate(`/search?${params.toString()}`);
  };

  const handleSell = () =>
    currentUser ? navigate("/createlisting") : openSignin();

  return (
    <section className="relative w-full min-h-[480px] md:min-h-[640px] flex items-center justify-center mb-4">
      <img
        src={herofinal}
        className="object-cover absolute inset-0 w-full h-full"
        alt=""
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center w-full px-4 py-16">
        {/* Heading */}
        <h1 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl tracking-wide sm:tracking-widest text-center max-w-4xl mb-8">
          FIND THE HOME THAT FITS YOUR LIFE.
        </h1>

        {/* Tabs */}
        <div className="flex w-full max-w-[600px]">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={`flex-1 text-base md:text-lg font-semibold py-2 transition-colors duration-300 ${
                activeButton === btn
                  ? "bg-blue-800 text-white"
                  : "bg-neutral-200 text-black hover:bg-neutral-300"
              }`}
              onClick={() => setActiveButton(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Search / Sell panel */}
        {activeButton === "SELL" ? (
          <div className="flex items-center justify-between gap-3 w-full max-w-[600px] min-h-[44px] bg-white rounded-b-md shadow-md px-3 py-2">
            <p className="text-sm text-neutral-700">
              List your property in minutes. It's free.
            </p>
            <button
              onClick={handleSell}
              className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2 rounded-md"
            >
              List property
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full max-w-[600px] h-11 bg-white rounded-b-md shadow-md overflow-hidden"
          >
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="flex-1 min-w-0 h-full text-neutral-800 pl-3 outline-none text-sm"
              placeholder="Address, city or area..."
            />
            <button
              type="submit"
              aria-label="Search"
              className="w-[50px] h-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center"
            >
              <IoSearchSharp className="text-white" fontSize={22} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}