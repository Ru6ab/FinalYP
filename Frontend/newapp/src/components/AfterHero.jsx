// import mosttrusted from '../assets/mosttrusted.png'
// import agent from '../assets/agent.jpg'
// export default function AfterHero() {
//   return (
//     <>
//       <div className="flex justify-center items-center font-serif mb-6">
//         <div className="flex flex-row  gap-6 w-[800px] m-10 border-2 border-gray-300 py-4 px-8 justify-center items-center ">
//           <img
//             src={mosttrusted}
//             className="h-[80px] w-[57px]"
//           />
//           <div className="flex flex-col gap-2 ">
//             <h1 className="whitespace-nowrap font-bold text-neutral-800 tracking-wider ">
//               Voted #1 Most Trusted Real Estate Agents in the USA
//             </h1>
//             <p className="text-[12px] text-neutral-600 leading-6 tracking-widest">
//               Voted most trusted Real Estate Agency brand by American shoppers
//               based on the <br />
//               BrandSpark® American Trust Study, years 2022-2024 and 2019.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row justify-center gap-6 items-center  w-full ml-7 mr-10  ">
//         <div className="flex items-start">
        
//            <img
//           className="w-[555px] h-[405px] flex items-start "
//           src={agent}
//         /></div>
       

//         <div className=" flex flex-col ">
//           <div>
//           <h1 className="text-[22px] text-neutral-800 font-bold tracking-wider ">Have confidence in any market with us.</h1>
//           <p className=" pt-6 text-[15px] max-w-[600px] text-neutral-600 leading-6 tracking-wider ">
//             RE/MAX® agents have the experience to get the job done in today’s
//             market1, backed by a robust network of over 140,000 agents in more
//             than 9,000 offices worldwide. With our extensive global connections
//             and deep local insights, you gain an edge that transcends what
//             you'll find online. Regardless of market conditions, life moves
//             on—people need to move, sell and buy. RE/MAX agents understand that
//             market shifts open new doors of opportunity, and with a trusted and
//             experienced RE/MAX agent, these opportunities are yours to seize.<br/><br/>
//             <p className="text-[15px] tracking-wider max-w-[600px] text-neutral-600 leading-6">The right time to move is when you're with the right agent—nobody
//             sells more real estate than RE/MAX2.<br/>
//             <p className="text-[11px] tracking-wider max-w-[600px] text-neutral-600  ">1, 2As measured by residential
//             transaction sides</p> </p>.
//           </p>
//           </div>
//           <div className="flex flex-col flex-grow  ">
//             <div className="mb-1"><button className="bg-blue-800 text-white p-1  w-[295px] rounded-[6px]"><h1 className="tracking-widest text-[13px] font-semibold">FIND YOUR RE/MAX AGENT TODAY</h1></button>
//             </div>
//            <div className="flex flex-row gap-3 mt-auto">
//           <button className="bg-blue-800 text-white  p-1  w-[295px] rounded-[6px]"><h1 className="tracking-widest text-[13px] font-semibold">GET HOMESELLER'S GUIDE</h1></button>
//           <button className="bg-blue-800 text-white  p-1  w-[295px] rounded-[6px]"><h1 className="tracking-widest text-[13px] font-semibold ">GET HOMEBUYER'S GUIDE</h1></button>
          
//             </div>
//           </div>
//         </div>
//       </div>
    

//     </>
//   );
// }

import mosttrusted from '../assets/mosttrusted.png';
import agent from '../assets/agent.jpg';

export default function AfterHero() {
  return (
    <>
      {/* ✅ TRUSTED BADGE SECTION */}
      {/* <div className="flex justify-center px-4 mb-6 font-serif">
        <div className="flex flex-col md:flex-row items-center gap-4 border-2 border-gray-300 py-4 px-6 w-full max-w-[800px]">
          <img src={mosttrusted} className="h-[80px] w-[57px]" />
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="font-bold text-neutral-800 tracking-wider text-[16px] whitespace-nowrap">
              Voted #1 Most Trusted Real Estate Agents in the USA
            </h1>
            <p className="text-[12px] text-neutral-600 leading-6 tracking-widest">
              Voted most trusted Real Estate Agency brand by American shoppers
              based on the <br className="hidden md:block" />
              BrandSpark® American Trust Study, years 2022-2024 and 2019.
            </p>
          </div>
        </div>
      </div> */}
      <div className="flex justify-center px-4 mb-6 font-serif">
  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 border-2 border-gray-300 py-4 px-4 sm:px-6 w-full max-w-[800px] rounded-lg bg-white overflow-hidden">
    
    {/* 🟦 Image */}
    <img src={mosttrusted} className="h-[80px] w-[57px] shrink-0" />

    {/* 📝 Text */}
    <div className="flex flex-col gap-2 text-center md:text-left">
      <h1 className="font-bold text-neutral-800 tracking-wider text-[16px]">
        Voted #1 Most Trusted Real Estate Agents in the USA
      </h1>
      <p className="text-[12px] text-neutral-600 leading-6 tracking-widest break-words">
        Voted most trusted Real Estate Agency brand by American shoppers
        based on the BrandSpark® American Trust Study, years 2022-2024 and 2019.
      </p>
    </div>
  </div>
</div>


      {/* ✅ AGENT SECTION */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 px-4 mb-10">
        {/* IMAGE */}
        <div className="w-full max-w-[555px]">
          <img
            src={agent}
            alt="agent"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* TEXT + BUTTONS */}
        <div className="flex flex-col items-start w-full max-w-[600px]">
          <h1 className="text-[22px] text-neutral-800 font-bold tracking-wider mt-4 lg:mt-0">
            Have confidence in any market with us.
          </h1>

          <p className="pt-4 text-[15px] text-neutral-600 leading-6 tracking-wider">
            RE/MAX® agents have the experience to get the job done in today’s
            market¹, backed by a robust network of over 140,000 agents in more
            than 9,000 offices worldwide. With our extensive global connections
            and deep local insights, you gain an edge that transcends what
            you'll find online. Regardless of market conditions, life moves
            on—people need to move, sell and buy. RE/MAX agents understand that
            market shifts open new doors of opportunity, and with a trusted and
            experienced RE/MAX agent, these opportunities are yours to seize.
          </p>

          <p className="pt-4 text-[15px] text-neutral-600 leading-6 tracking-wider">
            The right time to move is when you're with the right agent—nobody
            sells more real estate than RE/MAX².
          </p>
          <p className="text-[11px] text-neutral-600 mt-1 tracking-wider">
            ¹,² As measured by residential transaction sides
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-2 mt-6 w-full">
            <button className="bg-blue-800 text-white p-2 rounded-[6px] w-full sm:w-[295px]">
              <h1 className="tracking-widest text-[13px] font-semibold">
                FIND YOUR RE/MAX AGENT TODAY
              </h1>
            </button>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="bg-blue-800 text-white p-2 rounded-[6px] w-full sm:w-[295px]">
                <h1 className="tracking-widest text-[13px] font-semibold">
                  GET HOMESELLER'S GUIDE
                </h1>
              </button>
              <button className="bg-blue-800 text-white p-2 rounded-[6px] w-full sm:w-[295px]">
                <h1 className="tracking-widest text-[13px] font-semibold">
                  GET HOMEBUYER'S GUIDE
                </h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
