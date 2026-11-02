import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";

export default function LatestListings({ title, subtitle, query, viewAllTo, bg = "bg-white" }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/listing/get?${query}&limit=4&sort=createdAt&order=desc`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) setListings(data.slice(0, 4));
      } catch {
        /* hide section on error */
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (!loading && listings.length === 0) return null;

  return (
    <section className={bg}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          <Link
            to={viewAllTo}
            className="shrink-0 rounded-full border border-blue-700 px-4 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-700 hover:text-white"
          >
            View all
          </Link>
        </div>

        {/* Mobile: swipe row. sm and up: grid */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 w-[75%] shrink-0 animate-pulse rounded-xl bg-slate-200 sm:w-auto"
                />
              ))
            : listings.map((l) => (
                <div key={l._id} className="w-[75%] shrink-0 snap-start sm:w-auto">
                  <ListingItem listing={l} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}