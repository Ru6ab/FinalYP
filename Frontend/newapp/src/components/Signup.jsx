
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signinFailure, signinStart, signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import AuthWGoogle from './AuthWGoogle'

export default function Signup({ setSignup }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading and error from Redux state
  const { loading, error } = useSelector((state) => state.user);

  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      dispatch(signinFailure('Password must be at least 8 characters long and contain a number and a special character.'));
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming your backend sends savedUser inside data
        dispatch(signinSuccess(data));
        navigate("/profile");
      } else {
        dispatch(signinFailure(data.message || "Signup failed"));
      }
    } catch (err) {
      dispatch(signinFailure(err.message || "Something went wrong"));
    }
  };

  return (
    <div className="w-[345px] h-[470px] bg-white rounded-[10px] flex flex-col gap-6 px-4 py-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-neutral-700 font-bold text-[25px] tracking-wide">Sign Up</h1>
        <RxCross2 fontSize={25} onClick={() => setSignup(false)} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="font-bold text-[15px]  text-neutral-500 mb-1 tracking-wide" htmlFor="email">
            Email Address <span className="text-rose-500 text-[17px]">*</span>
          </label>
          <input
            placeholder="Enter Email Address"
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-1 text-lg placeholder:text-lg placeholder:text-gray-400 border-2 border-gray-400 focus:border-gray-800 rounded-md"
            required
          />
        </div>

        <div>
          <label className="font-bold text-[15px] text-neutral-500 mb-1 tracking-wide" htmlFor="password">
            Password <span className="text-rose-500 text-[17px]">*</span>
          </label>
          <div className="flex justify-between items-center relative">
            <input
              placeholder="Enter Password"
              type={showPass ? "text" : "password"}
              id="password"
              onChange={handleChange}
              className="w-full p-1 text-lg placeholder:text-lg placeholder:text-gray-400 border-2 border-gray-400 focus:border-gray-800 rounded-md"
              required
            />
            <MdOutlineRemoveRedEye
              onClick={() => setShowPass((prev) => !prev)}
              fontSize={30}
              className="absolute right-0 pr-2 text-neutral-500 cursor-pointer"
            />
          </div>
          {/* <p className={` ${error ? "text-rose-500" : "text-neutral-400"}`}>
            Password must be at least 8 characters and include a number or special character.
          </p> */}
        </div>

        {error && (
          <p className="text-rose-600 text-center mt-1 font-semibold">Can't signup. Try later!</p>
        )}

        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-rose-600 text-white font-semibold text-[17px] w-full p-2 rounded-md tracking-wide"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>

      {/* <div className="flex items-center">
        <div className="flex-1 border-t border-neutral-300 border-[1px]" />
        <h1 className="mx-2 text-neutral-600 font-bold">OR SIGN UP WITH</h1>
        <div className="flex-1 border-t border-neutral-300 border-[1px]" />
      </div>

      <div className="flex justify-center items-center">
        <button className="flex items-center border-blue-700 border-[2px]">
          <FaGoogle className="text-red-600 p-1" size={22} />
          <h1 className="text-white bg-blue-700 py-1 px-8 font-semibold text-[18px]">Google</h1>
        </button>
      </div> */}

       <div className="flex items-center mt-6">
                <div className="flex-1 border-t border-neutral-300 border-[1px]"></div>
                <h1 className="mx-2 text-neutral-600 font-bold ">OR SIGN UP WITH</h1>
                <div className="flex-1 border-t border-neutral-300 border-[1px]"></div>
              </div>
      
              <div className="mt-6 flex justify-center items-center">
               <AuthWGoogle/>
              </div>
    </div>
  );
}
