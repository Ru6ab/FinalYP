

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import ListingItem from "../components/ListingItem";

const API = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 9;

const readParams = (search) => {
  const p = new URLSearchParams(search);
  return {
    searchTerm: p.get("searchTerm") || "",
    type: p.get("type") || "all",
    parking: p.get("parking") === "true",
    furnished: p.get("furnished") === "true",
    offer: p.get("offer") === "true",
    sort: p.get("sort") || "createdAt",
    order: p.get("order") || "desc",
  };
};

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100";

export default function Search() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [filters, setFilters] = useState(readParams(search));
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // sync filters + fetch whenever the URL changes
  useEffect(() => {
    setFilters(readParams(search));
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API}/api/listing/get?${new URLSearchParams(search)}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (cancelled) return;
        if (!Array.isArray(data)) {
          setError(true);
          setListings([]);
          setShowMore(false);
          return;
        }
        setListings(data);
        setShowMore(data.length >= PAGE_SIZE);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [search]);

  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => params.set(k, v));
    setShowFilters(false);
    navigate(`/search?${params.toString()}`);
  };

  const handleReset = () => navigate("/search");

  const onShowMore = async () => {
    setLoadingMore(true);
    try {
      const params = new URLSearchParams(search);
      params.set("startIndex", listings.length);
      const res = await fetch(`${API}/api/listing/get?${params.toString()}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setListings((prev) => [...prev, ...data]);
        if (data.length < PAGE_SIZE) setShowMore(false);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const typeBtn = (value, label) => (
    <button
      type="button"
      onClick={() => set({ type: value })}
      className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
        filters.type === value
          ? "bg-blue-700 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );

  const check = (id, label) => (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={filters[id]}
        onChange={(e) => set({ [id]: e.target.checked })}
        className="h-4 w-4 accent-blue-700"
      />
      {label}
    </label>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 font-semibold text-slate-700 shadow-sm lg:hidden"
        >
          <FaSlidersH size={14} /> {showFilters ? "Hide filters" : "Filters"}
        </button>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* ---------- Filters ---------- */}
          <aside
            className={`${showFilters ? "block" : "hidden"} h-fit rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-20 lg:block`}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Search</label>
                <input
                  value={filters.searchTerm}
                  onChange={(e) => set({ searchTerm: e.target.value })}
                  placeholder="City, area or name"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Type</label>
                <div className="flex gap-2">
                  {typeBtn("all", "All")}
                  {typeBtn("rent", "Rent")}
                  {typeBtn("sale", "Sale")}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Filters</label>
                <div className="space-y-2">
                  {check("offer", "Special offers")}
                  {check("parking", "Parking")}
                  {check("furnished", "Furnished")}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Sort by</label>
                <select
                  value={`${filters.sort}_${filters.order}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split("_");
                    set({ sort, order });
                  }}
                  className={inputCls}
                >
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                  <option value="regularPrice_asc">Price: low to high</option>
                  <option value="regularPrice_desc">Price: high to low</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 py-2.5 font-semibold text-white transition hover:bg-blue-800"
                >
                  <FaSearch size={13} /> Search
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </form>
          </aside>

          {/* ---------- Results ---------- */}
          <section>
            <h1 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
              {loading ? "Searching..." : `${listings.length}${showMore ? "+" : ""} listing${listings.length === 1 ? "" : "s"} found`}
            </h1>

            {error && (
              <p className="rounded-md bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                Could not load listings. Please try again.
              </p>
            )}

            {!loading && !error && listings.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="font-semibold text-slate-800">No listings found</p>
                <p className="mt-1 text-sm text-slate-500">Try changing or resetting your filters.</p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-72 animate-pulse rounded-xl bg-slate-200" />
                  ))
                : listings.map((l) => <ListingItem key={l._id} listing={l} />)}
            </div>

            {showMore && !loading && (
              <div className="mt-8 text-center">
                <button
                  onClick={onShowMore}
                  disabled={loadingMore}
                  className="rounded-lg border border-blue-700 px-6 py-2.5 font-semibold text-blue-700 transition hover:bg-blue-50 disabled:opacity-60"
                >
                  {loadingMore ? "Loading..." : "Show more"}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}