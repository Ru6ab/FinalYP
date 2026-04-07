import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdPassword } from "react-icons/md";
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { signinFailure,signinStart,signinSuccess } from "../redux/user/userSlice";
import AuthWGoogle from './AuthWGoogle'
import Profile from '../Pages/Profile'


export default function Signin({ setSignin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const {loading, error} = useSelector((state)=>state.user)
  // const defaultUserState = { loading:false,error :null }
   const { loading, error ,currentUser } = useSelector((state) => state.user ||  { loading:false,error :null });
  
console.log(currentUser + " from signin")
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [showPass,setShowPass] = useState(false);  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); 

  console.log("Redux loading:", loading);
console.log("Redux error:", error);
console.log("Redux state:", useSelector((state) => state));
{console.log("Error in JSX:", error)}


  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  


const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(signinStart());

  // ✅ Stop if fields are empty
  if (!formData.email || !formData.password) {
    dispatch(signinFailure("Email and password are required."));
    return;
  }

  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json()
    console.log("Response text:", data);

    
    if (!response.ok || !data) {
      const message =  "Signin failed." ||  data?.message;
      dispatch(signinFailure(message));
      return;
    }

    dispatch(signinSuccess(data));
    console.log("Logged in user role:", data.role);
    if(data.role === "admin"){
      console.log("role is",data.role)
      navigate("/admin/dashboard")
    }else
    navigate("/profile");
  } catch (error) {
    dispatch(signinFailure("Network error. Try again."));
    console.error("Fetch error:", error);
  }
};




  

return (
    <div className="w-[345px] h-[470px] bg-white rounded-[10px] flex flex-col gap-6 px-4 py-6 ">
      <div className="  flex justify-between items-center   ">
        <div>
          <h1 className="text-neutral-700 font-bold text-[25px] tracking-wide">
            Log In
          </h1>
        </div>
        <div className="text-blue-700">
          <RxCross2
            fontSize={25}
            onClick={() => {
              setSignin(false);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col ">
        <form onSubmit={handleSubmit} id="signinForm">
          <div className="mb-4">
            <h1 className="font-bold text-[15px] text-neutral-500 mb-1 tracking-wide">
              Email Address <span className="text-rose-500 text-[17px]">*</span>
            </h1>

            <input
              placeholder="Enter Email Address"
              id="email"
              className="w-full p-1   text-lg placeholder:text-lg placeholder:text-gray-400  border-2 border-gray-400 focus:border-gray-800 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="">
            <h1 className="font-bold text-[15px] text-neutral-500 mb-1 tracking-wide">
              Password <span className="text-rose-500 text-[17px]">*</span>
            </h1>

             <div className="flex justify-between items-center relative "> 
            <input
              placeholder="Enter Password"
              className="w-full p-1   text-lg placeholder:text-lg placeholder:text-gray-400 border-2 border-gray-400 focus:border-gray-800  rounded-md"
              id="password"
            type={showPass ? "text":"password"}
              onChange={handleChange}
            />
            <MdOutlineRemoveRedEye
            //  onClick={()=>{setShowPass(true)}} will make true for all clicks after the first click is true,  no way to false
            onClick={()=>setShowPass((prev)=>!prev)}
              fontSize={30}
              className="absolute right-0 pr-2  text-neutral-500"
            />
            </div>
          </div>
        </form>

        <div className="mt-4 flex flex-col  justify-center items-center">
          {console.log("Error in JSX:", error)}
         {error && <div className="text-[14px] text-rose-500 font-bold ">   {typeof error === "string" ? error : JSON.stringify(error)}</div>}

         
        </div>
        <div className="mt-4">
       
          <button
            type="submit"
            form="signinForm"
            className="bg-rose-600 text-white font-semibold text-[17px] w-full p-2 rounded-md tracking-wide"
          >
           {loading ? "Loading..."  : "Sign In"}
       
          </button>
        </div>
        <div className="flex items-center mt-6">
          <div className="flex-1 border-t border-neutral-300 border-[1px]"></div>
          <h1 className="mx-2 text-neutral-600 font-bold ">OR SIGN IN WITH</h1>
          <div className="flex-1 border-t border-neutral-300 border-[1px]"></div>
        </div>

        <div className="mt-6 flex justify-center items-center">
         <AuthWGoogle/>
        </div>
      </div>
    </div>
  );
}
