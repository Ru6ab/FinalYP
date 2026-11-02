import { useState } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBed, FaBath, FaHome } from "react-icons/fa";
import getImgUrls from "../utils/getImgUrls";

const CURRENCY = "$";
const fmt = (n) => `${CURRENCY}${Number(n || 0).toLocaleString("en-US")}`;

export default function ListingItem({ listing }) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasOffer = listing.offer && listing.discountPrice;
  const price = hasOffer ? listing.discountPrice : listing.regularPrice;
  const src = getImgUrls(listing.imgUrls?.[0]);

  return (
    <Link
      to={`/listing/${listing._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {src && !imgFailed ? (
          <img
            src={src}
            alt={listing.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-slate-300">
            <FaHome size={36} />
          </div>
        )}

        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          <span
            className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white ${
              listing.type === "rent" ? "bg-amber-500" : "bg-green-600"
            }`}
          >
            {listing.type === "rent" ? "Rent" : "Sale"}
          </span>
          {hasOffer && (
            <span className="rounded-md bg-rose-600 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
              Offer
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-blue-700">
            {fmt(price)}
            {listing.type === "rent" && (
              <span className="text-xs font-medium text-slate-500"> /month</span>
            )}
          </span>
          {hasOffer && (
            <span className="text-xs text-slate-400 line-through">{fmt(listing.regularPrice)}</span>
          )}
        </div>

        <h3 className="truncate font-semibold text-slate-900 group-hover:text-blue-700">
          {listing.name}
        </h3>

        <p className="flex items-center gap-1 text-sm text-slate-500">
          <MdLocationOn className="shrink-0 text-slate-400" size={15} />
          <span className="truncate">{listing.address}</span>
        </p>

        <div className="mt-auto flex gap-4 border-t border-slate-100 pt-2.5 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <FaBed className="text-slate-400" />
            {listing.bedrooms} {listing.bedrooms > 1 ? "beds" : "bed"}
          </span>
          <span className="flex items-center gap-1.5">
            <FaBath className="text-slate-400" />
            {listing.bathrooms} {listing.bathrooms > 1 ? "baths" : "bath"}
          </span>
        </div>
      </div>
    </Link>
  );
}