
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";

import { useAuthModal } from "./AuthModalProvider";
import Logo from "./Logo";

const DEFAULT_AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const links = [
  { label: "Buy", to: "/search?type=sale" },
  { label: "Rent", to: "/search?type=rent" },
  { label: "Sell", to: "/createlisting", protected: true },
  { label: "Search", to: "/search" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((s) => s.user);
  const { openSignin, openSignup } = useAuthModal();
  const { pathname, search } = useLocation();

  useEffect(() => setOpen(false), [pathname, search]);

  const guard = (e, link) => {
    if (link.protected && !currentUser) {
      e.preventDefault();
      openSignin();
    }
  };

  const avatar = (size) => (
    <img
      src={currentUser?.avatar || DEFAULT_AVATAR}
      alt="Profile"
      className={`${size} rounded-full border border-slate-300 object-cover`}
    />
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo/>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={(e) => guard(e, l)}
              className="font-medium text-slate-700 transition hover:text-blue-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          {currentUser ? (
            <Link to="/profile">{avatar("h-10 w-10")}</Link>
          ) : (
            <>
              <button
                onClick={openSignin}
                className="rounded-md border border-blue-700 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Log In
              </button>
              <button
                onClick={openSignup}
                className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-2xl text-blue-700 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute inset-x-0 top-16 border-b bg-white shadow-lg md:hidden">
          <nav className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={(e) => guard(e, l)}
                className="border-b border-slate-100 py-3 text-lg font-medium text-slate-800"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="p-4">
            {currentUser ? (
              <Link to="/profile" className="flex items-center gap-3 font-medium text-slate-800">
                {avatar("h-10 w-10")} My profile
              </Link>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => { setOpen(false); openSignin(); }}
                  className="flex-1 rounded-md border border-blue-700 py-2.5 font-semibold text-blue-700"
                >
                  Log In
                </button>
                <button
                  onClick={() => { setOpen(false); openSignup(); }}
                  className="flex-1 rounded-md bg-blue-700 py-2.5 font-semibold text-white"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}