import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import {useNavigate } from 'react-router-dom'
import Profile from '../Pages/Profile';

export default function AuthWGoogle() {
  const dispatch =  useDispatch();
  const navigate = useNavigate();

    const handleGoogleClick = async ()=>{
        try{
          const provider  =  new GoogleAuthProvider()
          const auth = getAuth(app)
          const result = await signInWithPopup(auth,provider)
          console.log("This will run before popup result");
          console.log(result," this is result")
          const res =await  fetch('/api/auth/google',{
            method:"POST",
            headers:{
            "Content-Type":"application/JSON"
            },
            credentials: 'include',
            body:JSON.stringify({ avatar:result.user.photoURL, email: result.user.email, name:result.user.displayName })
            })
        //     const userData = { photo:result.user.photoURL, email: result.user.email, name:result.user.displayName }
         const data = await res.json()
         console.log(data)
          dispatch(signinSuccess(data))
           console.log("Logged in user role:", data.role);
    if(data.role === "admin"){
      console.log("role is",data.role)
      navigate("/admin/dashboard")
    }else
    navigate("/profile");
        
          
        }
        catch(error){
            console.log("error occured in catch of auth component", error)
        }
    }
  return (
    <div>
       <button onClick={handleGoogleClick} type='button'
        className="flex items-center border-blue-700 border-[2px] ">
            <FaGoogle className="text-red-600 p-1" size={22} />
            <h1 className="text-white bg-blue-700 py-1 px-8 font-semibold text-[18px]">
              Google
            </h1>
            
          </button>
    </div>
  )
}
