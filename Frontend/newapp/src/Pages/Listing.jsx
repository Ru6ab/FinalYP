// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
// import { Navigation } from "swiper/modules";
// import Contact from "../components/Contact";
// import { useSelector } from "react-redux";
// import "swiper/css/bundle";
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkerAlt,
//   FaParking,
// } from "react-icons/fa";

// export default function Listing() {
//   SwiperCore.use([Navigation]);
//   const params = useParams();
//   const [listing, setListing] = useState(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [contact, setContact] = useState(false);
//   const { currentUser } = useSelector((state) => state.user);


//     // console.log("current user id ", currentUser._id)
//   useEffect(() => {
//     const fetchListing = async () => {
//       const listingId = params.listingId;
//       try {
//         setLoading(true);
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/get/${listingId}`, { credentials: "include" });
//         const data = await res.json();
//         console.log("Fetched listing data:", data);
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
      
//           console.log("this is userref " + listing.userRef)
      
//         setError(false);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   return (
//     <div className="pt-[84px]">
//       {listing && (
//         <>
//           <Swiper navigation className="h-[550px] ">
//             {listing.imgUrls.map((url, index) => (
//               <SwiperSlide
//                 key={index}
//                 className="flex items-center justify-center h-[550px]"
//               >
//                 <img
//                   src={url}
//                   alt={`Slide ${index}`}
//                   className="max-h-[550px] w-full  object-center object-cover"
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>

    


//           <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
//             <p className="text-2xl font-semibold">
//               {listing.name} - ${" "}
//               {listing.offer
//                 ? listing.discountPrice.toLocaleString("en-US")
//                 : listing.regularPrice.toLocaleString("en-US")}
//               {listing.type === "rent" && " / month"}
//             </p>

//             <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
//               <FaMapMarkerAlt className="text-green-700" />
//               {listing.address}
//             </p>

//             <div className="flex gap-4">
//               <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//                 {listing.type === "rent" ? "For Rent" : "For Sale"}
//               </p>
//               {listing.offer && (
//                 <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//                   ${+listing.regularPrice - +listing.discountPrice} OFF
//                 </p>
//               )}
//             </div>

//             <p className="text-slate-800">
//               <span className="font-semibold text-black">Description - </span>
//               {listing.discription}
//             </p>

//             <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
//               <li className="flex items-center gap-1 whitespace-nowrap">
//                 <FaBed className="text-lg" />
//                 {listing.bedrooms > 1
//                   ? `${listing.bedrooms} beds `
//                   : `${listing.bedrooms} bed `}
//               </li>
//               <li className="flex items-center gap-1 whitespace-nowrap">
//                 <FaBath className="text-lg" />
//                 {listing.bathrooms > 1
//                   ? `${listing.bathrooms} baths `
//                   : `${listing.bathrooms} bath `}
//               </li>
//               <li className="flex items-center gap-1 whitespace-nowrap">
//                 <FaParking className="text-lg" />
//                 {listing.parking ? "Parking spot" : "No Parking"}
//               </li>
//               <li className="flex items-center gap-1 whitespace-nowrap">
//                 <FaChair className="text-lg" />
//                 {listing.furnished ? "Furnished" : "Unfurnished"}
//               </li>
//             </ul>

           
//             {/* Show contact button and form if user is NOT the owner */}
// {currentUser && listing.userRef !== currentUser._id && (
//   !contact ? (
//     <button
//       onClick={() => setContact(true)}
//       className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
//     >
//       Contact landlord
//     </button>
//   ) : (
//     <Contact listing={listing} />
//   )
// )}

//           </div>
//         </>
//       )}
      
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaHome,
  FaExpand,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { useAuthModal } from "../components/AuthModalProvider";
import getImgUrls from "../utils/getImgUrls";

const CURRENCY = "$";
const fmt = (n) => `${CURRENCY}${Number(n || 0).toLocaleString("en-US")}`;

export default function Listing() {
  const { listingId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { openSignin } = useAuthModal();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(false);
      setActive(0);
      setContact(false);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/listing/get/${listingId}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || data.success === false) {
          setError(true);
          return;
        }
        setListing(data);
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
  }, [listingId]);

  const images = (listing?.imgUrls || []).map(getImgUrls).filter(Boolean);

  const go = (dir) =>
    setActive((i) => (i + dir + images.length) % images.length);

  // keyboard controls for the full-screen viewer
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox, images.length]);

  /* ---------- loading / error states ---------- */
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-8 sm:px-6">
        <div className="mb-4 h-8 w-2/3 rounded bg-slate-200" />
        <div className="aspect-[16/10] rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-xl font-bold text-slate-900">Listing not found</p>
        <p className="mt-1 text-slate-500">It may have been removed.</p>
        <Link
          to="/search"
          className="mt-5 inline-block rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800"
        >
          Browse listings
        </Link>
      </div>
    );
  }

  const hasOffer = listing.offer && listing.discountPrice;
  const price = hasOffer ? listing.discountPrice : listing.regularPrice;
  const saving = hasOffer ? Number(listing.regularPrice) - Number(listing.discountPrice) : 0;
  const isOwner = currentUser && listing.userRef === currentUser._id;

  const features = [
    { icon: FaBed, text: `${listing.bedrooms} ${listing.bedrooms > 1 ? "beds" : "bed"}` },
    { icon: FaBath, text: `${listing.bathrooms} ${listing.bathrooms > 1 ? "baths" : "bath"}` },
    { icon: FaParking, text: listing.parking ? "Parking spot" : "No parking" },
    { icon: FaChair, text: listing.furnished ? "Furnished" : "Unfurnished" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* ---------- Header ---------- */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap gap-2">
              <span
                className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white ${
                  listing.type === "rent" ? "bg-amber-500" : "bg-green-600"
                }`}
              >
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </span>
              {hasOffer && (
                <span className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {fmt(saving)} off
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{listing.name}</h1>
            <p className="mt-1.5 flex items-center gap-2 text-slate-600">
              <FaMapMarkerAlt className="shrink-0 text-blue-700" />
              {listing.address}
            </p>
          </div>

          <div className="shrink-0 sm:text-right">
            <p className="text-3xl font-extrabold text-blue-700">
              {fmt(price)}
              {listing.type === "rent" && (
                <span className="text-base font-medium text-slate-500"> /month</span>
              )}
            </p>
            {hasOffer && (
              <p className="text-sm text-slate-400 line-through">{fmt(listing.regularPrice)}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ---------- Left: gallery + details ---------- */}
          <div className="space-y-6 lg:col-span-2">
            {/* Gallery */}
            <div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-200">
                {images.length > 0 ? (
                  <>
                    <img
                      src={images[active]}
                      alt={listing.name}
                      className="h-full w-full cursor-zoom-in object-cover"
                      onClick={() => setLightbox(true)}
                    />
                    <button
                      onClick={() => setLightbox(true)}
                      aria-label="View full screen"
                      className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
                    >
                      <FaExpand size={14} />
                    </button>
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => go(-1)}
                          aria-label="Previous image"
                          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white"
                        >
                          <FaChevronLeft size={14} />
                        </button>
                        <button
                          onClick={() => go(1)}
                          aria-label="Next image"
                          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white"
                        >
                          <FaChevronRight size={14} />
                        </button>
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                          {active + 1} / {images.length}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <div className="grid h-full w-full place-items-center text-slate-400">
                    <FaHome size={56} />
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setActive(i)}
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28 ${
                        i === active ? "border-blue-700" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {features.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 rounded-xl bg-white p-3.5 shadow-sm"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon />
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-2 text-lg font-bold text-slate-900">Description</h2>
              <p className="whitespace-pre-line leading-relaxed text-slate-700">
                {listing.discription}
              </p>
            </div>
          </div>

          {/* ---------- Right: contact ---------- */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-20">
              {isOwner ? (
                <>
                  <h2 className="text-lg font-bold text-slate-900">This is your listing</h2>
                  <p className="mt-1 text-sm text-slate-500">You can edit the details or photos anytime.</p>
                  <Link
                    to={`/updatelisting/${listing._id}`}
                    className="mt-4 block w-full rounded-lg bg-blue-700 py-2.5 text-center font-semibold text-white hover:bg-blue-800"
                  >
                    Edit listing
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-slate-900">Interested in this property?</h2>
                  <p className="mt-1 text-sm text-slate-500">Send a message to the owner.</p>

                  {!currentUser ? (
                    <button
                      onClick={openSignin}
                      className="mt-4 w-full rounded-lg bg-blue-700 py-2.5 font-semibold text-white hover:bg-blue-800"
                    >
                      Log in to contact
                    </button>
                  ) : !contact ? (
                    <button
                      onClick={() => setContact(true)}
                      className="mt-4 w-full rounded-lg bg-blue-700 py-2.5 font-semibold text-white hover:bg-blue-800"
                    >
                      Contact owner
                    </button>
                  ) : (
                    <div className="mt-4">
                      <Contact listing={listing} />
                    </div>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* ---------- Full-screen viewer ---------- */}
      {lightbox && images.length > 0 && (
        <div
          style={{ zIndex: 9999 }}
          className="fixed inset-0 flex items-center justify-center bg-black/90 p-4"
          onMouseDown={(e) => e.target === e.currentTarget && setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30"
          >
            <FaTimes />
          </button>

          <img
            src={images[active]}
            alt={listing.name}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 sm:left-6"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 sm:right-6"
              >
                <FaChevronRight />
              </button>
              <span className="absolute bottom-5 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white">
                {active + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
