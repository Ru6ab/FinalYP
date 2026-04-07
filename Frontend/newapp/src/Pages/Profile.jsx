

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { connectSocket, socket } from "../socket/socket";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingError, setShowListingError] = useState(false);
  const [showListings, setShowListings] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [totalListings, setTotalListings] = useState(0);
  const [listingType, setListingType] = useState([]);
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const navigate = useNavigate();

  const [imgSrc, setImgSrc] = useState(currentUser?.avatar || "");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    img: null,
  });
useEffect(() => {
  if (!currentUser) return;

  const s = connectSocket();

  s.emit("userOnline", {
    _id: currentUser._id,
    email: currentUser.email,
    avatar: currentUser.avatar,
    role: currentUser.role
  });
  return () => {
    s.disconnect();   // disconnect when component unmounts
  };

}, [currentUser]);


  useEffect(() => {
    let oldUrl;
    if (formData.img) {
      oldUrl = URL.createObjectURL(formData.img);
      setImgSrc(oldUrl);
    }

    return () => {
      if (oldUrl && oldUrl.startsWith("blob:")) {
        URL.revokeObjectURL(oldUrl);
      }
    };
  }, [formData.img]);

  
  useEffect(() => {
  if (currentUser) {
    setFormData((prev) => ({
      ...prev,
      email: currentUser.email || "",
      password: "",
    }));
    // ✅ Cloudinary URL used directly
    setImgSrc(currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  }
}, [currentUser]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      const formToSend = new FormData();
      if (formData.img) {
        formToSend.append("img", formData.img);
      }
      formToSend.append("email", formData.email);
      formToSend.append("password", formData.password);

      const res = await fetch(
        `http://localhost:8000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          credentials: "include",
          body: formToSend,
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      } else {
       
        setImgSrc(data.user.avatar);
        dispatch(updateUserSuccess(data.user));
      }
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
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

  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  const getListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(
        `http://localhost:8000/api/user/userlistings/${currentUser._id}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      console.log('total listings:', data.totalListings);
       console.log("data",data);
      setTotalListings(data.totalListings);
      setUserListings(data.listingArray);
      setListingType(data.listingType);
      setShowListings(true);
       setShowListingError(false);
    
    data.listingArray.forEach((listing)=>{
      console.log(listing)
    })
       console.log(currentUser._id)
    } catch (error) {
      setShowListingError(true);
    }
  };
const rent = listingType.find(type=> type._id === "rent")?.total || 0;
const sale = listingType.find(type=> type._id === "sale")?.total || 0;
  

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex flex-col ">
      <Navbar/>
    <div className="mt-[130px] flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-blue-800 text-3xl font-bold text-center mb-6 font-sans">
          Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            hidden
            accept="image/*"
            type="file"
            ref={imgRef}
            onChange={handleImgChange}
          />
          {imgSrc && (
            <img
              onClick={() => imgRef.current.click()}
              src={imgSrc}
              alt="Avatar"
              className="w-28 h-28 object-cover rounded-full cursor-pointer mx-auto"
            />
          )}

          <input
            placeholder="Email Address"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
          />
          <input
            placeholder="New Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
          />
          {/* <div className="gap-3 flex flex-col"> */}
          <button
            type="submit"
            className="bg-blue-900 text-white font-bold text-lg py-3 rounded-lg hover:opacity-95"
          >
            Update Profile
          </button>
        </form>

        <div className="mt-6   text-center">
          <Link
            to="/createlisting"
            className="bg-green-700 py-3 w-full text-white font-bold text-lg rounded-lg hover:opacity-95 inline-block "
          >
            Create Listing
          </Link>
        </div>

        <div className="flex justify-between mt-4 text-sm text-rose-600 font-medium">
          <button onClick={handleDeleteUser}>Delete Account</button>
          <button onClick={handleSignout}>Sign Out</button>
        </div>

       
        <div className="flex flex-col items-center text-center">
  <button onClick={getListings} className="mt-[120px]">
    <h2 className="text-blue-800 text-3xl font-bold font-sans">
      Your Listings
    </h2>
  </button>

  {/* Show "No listings" only if listings were fetched */}
  {showListings && userListings.length === 0 && !showListingError && (
    <p className="text-red-600 mt-4">No listings yet.</p>
  )}

  {/* Show error if fetching listings failed */}
  {showListingError && (
    <p className="text-red-600 mt-4">
      Could not fetch listings. Please try again.
    </p>
  )}
</div>

        </div>
        <div className="flex justify-center  mt-16 w-[700px]  ">
          {userListings.length > 0 && (
            <div className="  w-full ">
            
              <h1>Total Listings:{totalListings}</h1>
              <h1>Rent:{rent}</h1>
              <h1>Sell Listings:{sale}</h1>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  
                  className="flex justify-between items-center mb-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                   <Link to={`/listing/${listing._id}`} >
                     <img
                      src={listing.imgUrls[0]}
                      alt={listing.title}
                      className="w-20 h-20 object-contain rounded-lg"
                    /></Link>
                 
                  </div>
                  <div>
                     <Link to={`/listing/${listing._id}`}>  <h1 className="font-semibold text-[19px] truncate hover:underline text-neutral-700">
                      {listing.name}
                    </h1>
                    </Link></div>
                  <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                  <Link to={`/updatelisting/${listing._id}`}>
                   <button
                    onClick={() => updateListing(listing._id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Edit
                  </button>
                  </Link>
                  </div>
                  </div>
                  
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
