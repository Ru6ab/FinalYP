import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function AdminRoute() {

    const {currentUser} = useSelector(state=>state.user)
    console.log("curr user is: ",currentUser)   
     console.log("curr user role: ",currentUser.role)  
     if(!currentUser) return  <Navigate to="/"/>
      if (currentUser === null) {
    return <div>Loading...</div>;
  }
     if(currentUser.role !=="admin") return  <Navigate to="/"/>
     return <Outlet/>
}