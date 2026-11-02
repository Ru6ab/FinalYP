

// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signoutUserFailure,
//   signoutUserStart,
//   signoutUserSuccess,
// } from "../redux/user/userSlice";
// import { connectSocket, socket } from "../socket/socket";
// import Navbar from "../components/Navbar";

// const Profile = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [showListingError, setShowListingError] = useState(false);
//   const [showListings, setShowListings] = useState(false);
//   const [userListings, setUserListings] = useState([]);
//   const [totalListings, setTotalListings] = useState(0);
//   const [listingType, setListingType] = useState([]);
//   const dispatch = useDispatch();
//   const imgRef = useRef(null);
//   const navigate = useNavigate();

//   const [imgSrc, setImgSrc] = useState(currentUser?.avatar || "");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     img: null,
//   });
// useEffect(() => {
//   if (!currentUser) return;

//   const s = connectSocket();

//   s.emit("userOnline", {
//     _id: currentUser._id,
//     email: currentUser.email,
//     avatar: currentUser.avatar,
//     role: currentUser.role
//   });
//   return () => {
//     s.disconnect();   // disconnect when component unmounts
//   };

// }, [currentUser]);


//   useEffect(() => {
//     let oldUrl;
//     if (formData.img) {
//       oldUrl = URL.createObjectURL(formData.img);
//       setImgSrc(oldUrl);
//     }

//     return () => {
//       if (oldUrl && oldUrl.startsWith("blob:")) {
//         URL.revokeObjectURL(oldUrl);
//       }
//     };
//   }, [formData.img]);

  
//   useEffect(() => {
//   if (currentUser) {
//     setFormData((prev) => ({
//       ...prev,
//       email: currentUser.email || "",
//       password: "",
//     }));
//     // ✅ Cloudinary URL used directly
//     setImgSrc(currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
//   }
// }, [currentUser]);

//   const handleImgChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         img: file,
//       }));
//     }
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(updateUserStart());

//     try {
//       const formToSend = new FormData();
//       if (formData.img) {
//         formToSend.append("img", formData.img);
//       }
//       formToSend.append("email", formData.email);
//       formToSend.append("password", formData.password);

//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`,
//         {
//           method: "POST",
//           credentials: "include",
//           body: formToSend,
//         }
//       );

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//       } else {
       
//         setImgSrc(data.user.avatar);
//         dispatch(updateUserSuccess(data.user));
//       }
//     } catch (err) {
//       dispatch(updateUserFailure(err.message));
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//       navigate("/");
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleSignout = async () => {
//     try {
//       dispatch(signoutUserStart());
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signout`, {credentials: "include"});
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signoutUserFailure(data.message));
//       }
//       dispatch(signoutUserSuccess(data));
//     } catch (error) {
//       dispatch(signoutUserFailure(error.message));
//     }
//   };

//   const getListings = async () => {
//     try {
//       setShowListingError(false);
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/user/userlistings/${currentUser._id}`,
//         { credentials: "include" }
//       );
//       const data = await res.json();
//       if (data.success === false) {
//         setShowListingError(true);
//         return;
//       }
//       console.log('total listings:', data.totalListings);
//        console.log("data",data);
//       setTotalListings(data.totalListings);
//       setUserListings(data.listingArray);
//       setListingType(data.listingType);
//       setShowListings(true);
//        setShowListingError(false);
    
//     data.listingArray.forEach((listing)=>{
//       console.log(listing)
//     })
//        console.log(currentUser._id)
//     } catch (error) {
//       setShowListingError(true);
//     }
//   };
// const rent = listingType.find(type=> type._id === "rent")?.total || 0;
// const sale = listingType.find(type=> type._id === "sale")?.total || 0;
  

//   const handleDeleteListing = async (listingId) => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/delete/${listingId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }
//       setUserListings((prev) =>
//         prev.filter((listing) => listing._id !== listingId)
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <div className="flex flex-col ">
//       <Navbar/>
//     <div className="mt-[130px] flex flex-col items-center justify-center bg-white px-4">
//       <div className="w-full max-w-md">
//         <h1 className="text-blue-800 text-3xl font-bold text-center mb-6 font-sans">
//           Your Profile
//         </h1>

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
//           <input
//             hidden
//             accept="image/*"
//             type="file"
//             ref={imgRef}
//             onChange={handleImgChange}
//           />
//           {imgSrc && (
//             <img
//               onClick={() => imgRef.current.click()}
//               src={imgSrc}
//               alt="Avatar"
//               className="w-28 h-28 object-cover rounded-full cursor-pointer mx-auto"
//             />
//           )}

//           <input
//             placeholder="Email Address"
//             id="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
//           />
//           <input
//             placeholder="New Password"
//             id="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
//           />
//           {/* <div className="gap-3 flex flex-col"> */}
//           <button
//             type="submit"
//             className="bg-blue-900 text-white font-bold text-lg py-3 rounded-lg hover:opacity-95"
//           >
//             Update Profile
//           </button>
//         </form>

//         <div className="mt-6   text-center">
//           <Link
//             to="/createlisting"
//             className="bg-green-700 py-3 w-full text-white font-bold text-lg rounded-lg hover:opacity-95 inline-block "
//           >
//             Create Listing
//           </Link>
//         </div>

//         <div className="flex justify-between mt-4 text-sm text-rose-600 font-medium">
//           <button onClick={handleDeleteUser}>Delete Account</button>
//           <button onClick={handleSignout}>Sign Out</button>
//         </div>

       
//         <div className="flex flex-col items-center text-center">
//   <button onClick={getListings} className="mt-[120px]">
//     <h2 className="text-blue-800 text-3xl font-bold font-sans">
//       Your Listings
//     </h2>
//   </button>

//   {/* Show "No listings" only if listings were fetched */}
//   {showListings && userListings.length === 0 && !showListingError && (
//     <p className="text-red-600 mt-4">No listings yet.</p>
//   )}

//   {/* Show error if fetching listings failed */}
//   {showListingError && (
//     <p className="text-red-600 mt-4">
//       Could not fetch listings. Please try again.
//     </p>
//   )}
// </div>

//         </div>
//         <div className="flex justify-center  mt-16 w-[700px]  ">
//           {userListings.length > 0 && (
//             <div className="  w-full ">
            
//               <h1>Total Listings:{totalListings}</h1>
//               <h1>Rent:{rent}</h1>
//               <h1>Sell Listings:{sale}</h1>
//               {userListings.map((listing) => (
//                 <div
//                   key={listing._id}
                  
//                   className="flex justify-between items-center mb-4 p-4 border rounded-lg"
//                 >
//                   <div className="flex items-center gap-4">
//                    <Link to={`/listing/${listing._id}`} >
//                      <img
//                       src={listing.imgUrls[0]}
//                       alt={listing.title}
//                       className="w-20 h-20 object-contain rounded-lg"
//                     /></Link>
                 
//                   </div>
//                   <div>
//                      <Link to={`/listing/${listing._id}`}>  <h1 className="font-semibold text-[19px] truncate hover:underline text-neutral-700">
//                       {listing.name}
//                     </h1>
//                     </Link></div>
//                   <div className="flex flex-col gap-3">
//                   <button
//                     onClick={() => handleDeleteListing(listing._id)}
//                     className="text-red-600 hover:underline font-medium"
//                   >
//                     Delete
//                   </button>
//                   <Link to={`/updatelisting/${listing._id}`}>
//                    <button
//                     onClick={() => updateListing(listing._id)}
//                     className="text-red-600 hover:underline font-medium"
//                   >
//                     Edit
//                   </button>
//                   </Link>
//                   </div>
//                   </div>
                  
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera, FaPlus, FaTrash, FaEdit, FaSignOutAlt } from "react-icons/fa";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess,
} from "../redux/user/userSlice";
import { connectSocket } from "../socket/socket";

const DEFAULT_AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const inputCls =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [listings, setListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [listingsError, setListingsError] = useState(false);

  // socket (unchanged logic)
  useEffect(() => {
    if (!currentUser) return;
    const s = connectSocket();
    s.emit("userOnline", {
      _id: currentUser._id,
      email: currentUser.email,
      avatar: currentUser.avatar,
      role: currentUser.role,
    });
    return () => {
      s.disconnect();
    };
  }, [currentUser]);

  // keep email in sync with store
  useEffect(() => {
    if (currentUser) setEmail(currentUser.email || "");
  }, [currentUser]);

  // avatar preview
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // load listings automatically
  useEffect(() => {
    if (!currentUser?._id) return;
    const load = async () => {
      setListingsLoading(true);
      setListingsError(false);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/userlistings/${currentUser._id}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (data.success === false) {
          setListingsError(true);
          return;
        }
        setListings(data.listingArray || []);
      } catch {
        setListingsError(true);
      } finally {
        setListingsLoading(false);
      }
    };
    load();
  }, [currentUser?._id]);

  const avatarSrc = preview || currentUser?.avatar || DEFAULT_AVATAR;
  const rentCount = listings.filter((l) => l.type === "rent").length;
  const saleCount = listings.filter((l) => l.type === "sale").length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setSaving(true);
    dispatch(updateUserStart());
    try {
      const body = new FormData();
      if (file) body.append("img", file);
      body.append("email", email);
      if (password) body.append("password", password);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`,
        { method: "POST", credentials: "include", body }
      );
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setMessage({ type: "error", text: data.message || "Update failed." });
        return;
      }
      dispatch(updateUserSuccess(data.user));
      setFile(null);
      setPassword("");
      setMessage({ type: "success", text: "Profile updated." });
    } catch (err) {
      dispatch(updateUserFailure(err.message));
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signout`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Delete your account permanently? This cannot be undone.")) return;
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleDeleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) return;
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const stats = [
    { label: "Total", value: listings.length },
    { label: "For Rent", value: rentCount },
    { label: "For Sale", value: saleCount },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ---------- Profile card ---------- */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:col-span-1">
            <h1 className="mb-6 text-xl font-bold text-slate-900">My Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                hidden
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={(e) => setFile(e.target.files[0] || null)}
              />

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  className="group relative"
                  aria-label="Change photo"
                >
                  <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow ring-1 ring-slate-200"
                  />
                  <span className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full bg-blue-700 text-white shadow transition group-hover:bg-blue-800">
                    <FaCamera size={13} />
                  </span>
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  {file ? "New photo selected. Click Save to apply." : "Click to change photo"}
                </p>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Leave empty to keep current"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                />
              </div>

              {message.text && (
                <p
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-blue-700 py-2.5 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <button
                onClick={handleSignout}
                className="flex items-center gap-2 font-medium text-slate-600 hover:text-slate-900"
              >
                <FaSignOutAlt /> Sign out
              </button>
              <button
                onClick={handleDeleteUser}
                className="font-medium text-rose-600 hover:underline"
              >
                Delete account
              </button>
            </div>
          </aside>

          {/* ---------- Listings ---------- */}
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">My Listings</h2>
              <Link
                to="/createlisting"
                className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                <FaPlus size={12} /> New listing
              </Link>
            </div>

            {/* Stats */}
            <div className="mb-5 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-blue-700">{s.value}</p>
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>

            {/* States */}
            {listingsLoading && <p className="text-slate-500">Loading listings...</p>}

            {listingsError && (
              <p className="rounded-md bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                Could not load your listings. Refresh and try again.
              </p>
            )}

            {!listingsLoading && !listingsError && listings.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="font-semibold text-slate-800">No listings yet</p>
                <p className="mt-1 text-sm text-slate-500">Create your first listing to see it here.</p>
                <Link
                  to="/createlisting"
                  className="mt-4 inline-block rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Create listing
                </Link>
              </div>
            )}

            {/* List */}
            <ul className="space-y-3">
              {listings.map((listing) => (
                <li
                  key={listing._id}
                  className="flex items-center gap-4 rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md"
                >
                  <Link to={`/listing/${listing._id}`} className="shrink-0">
                    <img
                      src={listing.imgUrls?.[0]}
                      alt={listing.name}
                      className="h-20 w-24 rounded-lg bg-slate-100 object-cover sm:h-24 sm:w-32"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link to={`/listing/${listing._id}`}>
                      <h3 className="truncate font-semibold text-slate-900 hover:text-blue-700">
                        {listing.name}
                      </h3>
                    </Link>
                    {listing.type && (
                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          listing.type === "rent"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {listing.type === "rent" ? "For Rent" : "For Sale"}
                      </span>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Link
                      to={`/updatelisting/${listing._id}`}
                      className="flex items-center justify-center gap-1.5 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <FaEdit size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteListing(listing._id)}
                      className="flex items-center justify-center gap-1.5 rounded-md border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
                    >
                      <FaTrash size={11} /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}