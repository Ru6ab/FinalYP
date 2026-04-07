import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
export default function NewProfile() {
 
  const [imgSrc, setImgSrc] = useState(currentUser.avatar);
  const imgRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const formToSend = new FormData();
      formToSend.append("img", formData.img);
      formToSend.append("email", formData.email);
      formToSend.append("password", formData.password);

      const res = await fetch(`/api/user/upload/${currentUser._id}`, {
        method: "POST",
        body: formToSend,
      });
      const data =await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleImgChange = (e) => {
    const selectedImg = e.target.files[0];
    if (selectedImg) {
      const newImgURL = URL.createObjectURL(selectedImg);
      setImgSrc(newImgURL);
      setFormData((prev) => ({ ...prev, img: selectedImg }));
    }
  };
  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md ">
        <h1 className="text-blue-800 text-3xl font-bold text-center mb-6 font-sans">
          Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            hidden
            accept="image/*"
            type="file"
            ref={imgRef}
            id="img"
            onChange={handleImgChange}
          />
          <img onClick={()=>imgRef.current && imgRef.current.click()} src={imgSrc} />

          <input
            placeholder="Username"
            id="username"
            className="w-full px-4 py-3 font-semibold tracking-wider placeholder:text-gray-500 border border-gray-300 focus:outline-none  focus:ring-blue-500 rounded-lg"
          />
          <input
            placeholder=" Email Address"
            id="email"
            type="email"
            onChange={handleTextChange}
            className="w-full px-4 py-3 font-semibold tracking-wider placeholder:text-gray-500 border border-gray-300 focus:outline-none  focus:ring-blue-500 rounded-lg"
          />
          <input
            placeholder=" Password"
            id="password"
            type="password"
            onChange={handleTextChange}
            className="w-full px-4 py-3 font-semibold tracking-wider placeholder:text-gray-500 border border-gray-300 focus:outline-none  focus:ring-blue-500 rounded-lg"
          />

          <button
            type="submit"
            onSubmit={handleSubmit}
            className="bg-blue-900  text-white font-bold tracking-wider text-[17px] py-4 rounded-lg font-sans transition duration-200 hover:opacity-90"
          >
            Update Profile
          </button>
        </form>

        <div className="flex justify-between mt-6 text-sm font-medium text-rose-600">
          <button className="">Delete Account</button>
          <button className="">Sign Out</button>
        </div>
      </div>
    </div>
  );
}
