

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import { useSelector } from "react-redux";
import lasttry from "../assets/lasttry.png";
import About from '../Pages/About'

export default function Navbar() {
  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const avatarUrl = currentUser?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".menu-toggle")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <>
      <div className="bg-neutral-50 fixed top-0 z-[9999] w-full h-[84px] flex justify-between items-center px-4 sm:px-10 border-t-[6px] border-red-600">
        {/* Logo */}
        <Link to="/">
          <img
            src={lasttry}
            alt="Logo"
            className="object-contain h-[60px] w-[160px] sm:h-[75px] sm:w-[220px]"
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center">
         
        </div>

        {/* Mobile Search Icon */}
        <div className="sm:hidden flex items-center gap-3">
          
          <button
            className="text-blue-800 text-2xl menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-10 items-center">
          <Link to="/"><li className="text-blue-800 font-semibold text-[23px]">Buy</li></Link>
          <Link to="/sell"><li className="text-blue-800 font-semibold text-[23px]">Sell</li></Link>
          <Link to="/rent"><li className="text-blue-800 font-semibold text-[23px]">Rent</li></Link>
          <Link to="/search"><li className="text-blue-800 font-semibold text-[23px]">Search</li></Link>
          <Link to="/about"><li className="text-blue-800 font-semibold text-[23px]">About</li></Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-[50px] w-[50px] rounded-full border border-gray-300 object-cover"
              />
            </Link>
          ) : (
            <div className="flex gap-4">
              <li>
                <button
                  className="text-blue-800 border border-blue-800 py-2 px-4 rounded-md text-md font-semibold"
                  onClick={() => setSignin(true)}
                >
                  Log In
                </button>
              </li>
              <li>
                <button
                  className="bg-blue-800 text-white py-2 px-4 rounded-md text-md font-semibold"
                  onClick={() => setSignup(true)}
                >
                  Sign Up
                </button>
              </li>
            </div>
          )}
        </ul>
      </div>

      {/* Mobile Search Input */}
   {showMobileSearch && (
  <div className="sm:hidden px-4 mt-[90px]">
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-neutral-400 rounded-xl px-4 py-2 bg-white w-full"
    >
      <input
        type="text"
        value={searchTerm}
        placeholder="Search properties"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="outline-none bg-transparent text-gray-800 placeholder-gray-400 w-full"
      />
      <button>
        <FaSearch className="text-gray-500 ml-2" />
      </button>
    </form>
  </div>
)}


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu fixed top-[84px] w-full bg-white shadow-md z-[9998] flex flex-col items-end px-6 py-4 gap-4 sm:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}><p className="text-blue-800 font-semibold text-lg">Buy</p></Link>
          <Link to="/sell" onClick={() => setMenuOpen(false)}><p className="text-blue-800 font-semibold text-lg">Sell</p></Link>
          <Link to="/rent" onClick={() => setMenuOpen(false)}><p className="text-blue-800 font-semibold text-lg">Rent</p></Link>
          <Link to="/agents" onClick={() => setMenuOpen(false)}><p className="text-blue-800 font-semibold text-lg">Search</p></Link>
         

          {currentUser ? (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-[45px] w-[45px] rounded-full border border-gray-300 object-cover mt-2"
              />
            </Link>
          ) : (
            <div className="flex flex-col gap-3 mt-2 w-full">
              <button
                className="text-blue-800 border border-blue-800 py-2 px-4 rounded-md text-md font-semibold w-full"
                onClick={() => {
                  setSignin(true);
                  setMenuOpen(false);
                }}
              >
                Log In
              </button>
              <button
                className="bg-blue-800 text-white py-2 px-4 rounded-md text-md font-semibold w-full"
                onClick={() => {
                  setSignup(true);
                  setMenuOpen(false);
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}

      {/* Popups */}
      {signin && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <Signin setSignin={setSignin} />
          </div>
        </div>
      )}
      {signup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <Signup setSignup={setSignup} />
          </div>  
        </div>
      )}
    </>
  );
}
