// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import AdminHome from "./AdminHome";

// export default function AdminSidebar() {
//   const [openListings, setOpenListings] = useState(false);
//   const [openUsers, setOpenUsers] = useState(false);

//   const linkStyle = ({ isActive }) =>
//     `p-2 rounded block ${
//       isActive ? "bg-gray-700" : "hover:bg-gray-700"
//     }`;

//   return (
//    <>

//       {/* Sidebar */}
//       <div className="w-64 h-screen bg-gray-900 text-white p-4">

//         <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

//         <nav className="flex flex-col gap-3">

//           {/* Dashboard */}
//           <NavLink
//             to="/admin/dashboard"
//             className={linkStyle}
//             onClick={() => {
//               setOpenListings(false);
//               setOpenUsers(false);
//             }}
//           >
//             Dashboard
//           </NavLink>

//           {/* Users */}
//           <NavLink
//             to="/admin/users"
//             className={linkStyle}
//             onClick={() => {
//               setOpenUsers((prev) => !prev);
//               setOpenListings(false);
//             }}
//           >
//             Users
//           </NavLink>

//           {openUsers && (
//             <div className="ml-4 flex flex-col gap-2">
//               <NavLink
//                 to="/admin/users/all"
//                 className={linkStyle}
//               >
//                 All Users
//               </NavLink>

              
//             </div>
//           )}

//           {/* Listings */}
//           <NavLink
//             to="/admin/listings"
//             className={linkStyle}
//             onClick={() => {
//               setOpenListings((prev) => !prev);
//               setOpenUsers(false);
//             }}
//           >
//             Listings
//           </NavLink>

//           {openListings && (
//             <div className="ml-4 flex flex-col gap-2">

//               <NavLink
//                 to="/admin/listings/rent"
//                 className={linkStyle}
//               >
//                 Rent Listings
//               </NavLink>

//               <NavLink
//                 to="/admin/listings/sale"
//                 className={linkStyle}
//               >
//                 Sale Listings
//               </NavLink>

//             </div>
//           )}

//         </nav>
//       </div>

//       {/* Page Content */}
      
// </>
    
//   );
// }

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const [openListings, setOpenListings] = useState(
    location.pathname.startsWith("/admin/listings")
  );
  const [openUsers, setOpenUsers] = useState(
    location.pathname.startsWith("/admin/users")
  );

  const subLink = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
      isActive
        ? "bg-indigo-600 text-white font-semibold"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  const isListingsActive = location.pathname.startsWith("/admin/listings");
  const isUsersActive    = location.pathname.startsWith("/admin/users");
  const isDashActive     = location.pathname === "/admin/dashboard";

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="w-64 min-h-screen bg-gray-950 text-white flex flex-col"
    >
      {/* Logo / Brand */}
      <div className="px-5 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-base">
            🏠
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Admin Panel</p>
            <p className="text-xs text-gray-500">Management Console</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-4 flex-1">

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isDashActive
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <span className="text-base">📊</span>
          Dashboard
        </NavLink>

        {/* ── Users ── */}
        <div>
          <button
            onClick={() => { setOpenUsers(p => !p); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isUsersActive
                ? "text-white bg-gray-800"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-base">👥</span>
            <span className="flex-1 text-left">Users</span>
            {/* chevron */}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${openUsers ? "rotate-90" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {openUsers && (
            <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-gray-800 pl-3">
              <NavLink to="/admin/users/all" className={subLink}>
                <span className="text-xs">👤</span> All Users
              </NavLink>
            </div>
          )}
        </div>

        {/* ── Listings ── */}
        <div>
          <button
            onClick={() => { setOpenListings(p => !p); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isListingsActive
                ? "text-white bg-gray-800"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-base">🏠</span>
            <span className="flex-1 text-left">Listings</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${openListings ? "rotate-90" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          {openListings && (
            <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-gray-800 pl-3">
              <NavLink to="/admin/listings/rent" className={subLink}>
                <span className="text-xs">🔑</span> Rent Listings
              </NavLink>
              <NavLink to="/admin/listings/sale" className={subLink}>
                <span className="text-xs">💰</span> Sale Listings
              </NavLink>
            </div>
          )}
        </div>

      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800">
        <p className="text-xs text-gray-600 text-center">Admin v1.0</p>
      </div>
    </div>
  );
}
