import React from "react";
import { Link } from "react-router-dom";
import homeimg from "../assets/homeimg.jpeg";
import home from "../assets/home.jpg";
import farmhouse from "../assets/farmhouse.jpg";
import home4 from "../assets/home4.jpg";

const items = [
  { title: "New Listings", img: homeimg, to: "/search?sort=createdAt&order=desc" },
  { title: "For Rent", img: home, to: "/search?type=rent" },
  { title: "For Sale", img: farmhouse, to: "/search?type=sale" },
  { title: "Special Offers", img: home4, to: "/search?offer=true" },
];

export default function PopularSearch() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
        Popular Searches
      </h2>

     <div className="grid grid-cols-2  sm:gap-8">
    {items.map((item) => (
      <Link key={item.title} to={item.to} className="group block">
        <div className="isolate aspect-[16/9]  overflow-hidden rounded-lg bg-white shadow transition-shadow group-hover:shadow-lg">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="h-full w-full transform-gpu object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
          />
        </div>
        <p className="mt-3 text-center text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-700 sm:text-base">
          {item.title}
        </p>
      </Link>
    ))}
  </div>
    </section>
  );
}