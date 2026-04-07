import { Route, Routes, useLocation ,BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signup from "./components/Signup";
import Search from "./components/Search";
import CreateListing from "./components/CreateListing";
import Profile from "./Pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminHome from "./admin/AdminHome";
import AdminSidebar from "./admin/AdminSidebar";
import AdminListing from "./Pages/AdminListing";
import AdminUsers from "./Pages/AdminUsers";
import AdminRent from "./admin/AdminRent";
import AdminSale from "./admin/AdminSale";
export default function App() {
//  const location = useLocation(); // Get current route
 return (
    <>    
      {/* Hide Navbar on the /search page */}
      {/* {location.pathname !== "/search" && location.pathname !== '/about' && <Navbar />} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing/>}/>
        <Route element = {<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/createlisting" element={<CreateListing />} />
        <Route path="/updatelisting/:listingId" element = {<UpdateListing/>}/>
        </Route>
        <Route element = {<AdminRoute/>}>
        <Route path="/admin/dashboard" element = {<AdminDashboard/>}/>
        <Route path ='/admin/listings' element= {<AdminListing/>}/>
        <Route path="/admin/listings/rent" element={<AdminRent/>}/>
           <Route path="/admin/listings/sale" element={<AdminSale/>}/>
          <Route path ='/admin/users/all' element= {<AdminUsers/>}/>
        </Route>
      </Routes>      
    </>   
 )
}




