import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import handshakenew from "../assets/handshakenew.jpg";
import { useAuthModal } from "./AuthModalProvider";

const points = [
  "Free to list, no hidden fees",
  "Add photos, price and location in minutes",
  "Buyers and renters contact you directly",
];

export default function SplitSection() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((s) => s.user);
  const { openSignup } = useAuthModal();

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12">
      <img
        src={handshakenew}
        alt="House for sale"
        loading="lazy"
        className="h-64 w-full rounded-xl object-cover sm:h-80 md:h-[420px]"
      />
      <div>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Have a property to rent or sell?
        </h2>
        <p className="mt-3 text-slate-600">
          List it on HeavenHomes and reach people who are looking right now.
        </p>
        <ul className="mt-5 space-y-2 text-slate-700">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="font-bold text-blue-700">✓</span> {p}
            </li>
          ))}
        </ul>
        <button
          onClick={() => (currentUser ? navigate("/createlisting") : openSignup())}
          className="mt-6 w-full rounded-md bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 sm:w-auto"
        >
          {currentUser ? "Create a listing" : "Get started free"}
        </button>
      </div>
    </section>
  );
}