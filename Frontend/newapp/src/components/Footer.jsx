import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

import { useAuthModal } from "./AuthModalProvider";
import Logo from "./Logo";

const explore = [
  { label: "Buy", to: "/search?type=sale" },
  { label: "Rent", to: "/search?type=rent" },
  { label: "Search", to: "/search" },
  { label: "About", to: "/about" },
];

const socials = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

const linkCls = "text-blue-100 transition hover:text-white";

export default function Footer() {
  const { currentUser } = useSelector((s) => s.user);
  const { openSignin } = useAuthModal();

  return (
    <footer className="bg-blue-800 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {/* Brand */}
        <div>
        <Logo light />
          <p className="mt-4 max-w-xs text-sm text-blue-100">
            Find homes to buy or rent, or list your own property for free.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white hover:text-blue-800"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-4 font-semibold">Explore</h3>
          <ul className="space-y-2 text-sm">
            {explore.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For owners */}
        <div>
          <h3 className="mb-4 font-semibold">For Owners</h3>
          <ul className="space-y-2 text-sm">
            <li>
              {currentUser ? (
                <Link to="/createlisting" className={linkCls}>List your property</Link>
              ) : (
                <button onClick={openSignin} className={linkCls}>List your property </button>
              )}
            </li>
          
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <a
            href="mailto:heavenhomes@gmail.com"
            className="flex items-center gap-2 text-sm text-blue-100 transition hover:text-white"
          >
            <FaEnvelope /> heavenhomes@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-blue-100 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} HeavenHomes. All rights reserved.</p>
          <p>Built with the MERN stack</p>
        </div>
      </div>
    </footer>
  );
}