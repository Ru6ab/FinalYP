import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connectSocket } from "../socket/socket";
import axios from "axios";


export default function AdminUsers() {
  console.log("Current path:", window.location.pathname);
  const currentUser = useSelector((state) => state.user);
 const [stats, setStats] = useState({ latestUsers: 0})
 const getAdminStats = async () => {
    try {
     
    
      const res = await axios.get('/api/admin/stats', { withCredentials: true })
      console.log("Response:", res)
      console.log("Data:", res.data)
      
      // Ensure we're setting the data correctly
      setStats({
        latestUsers: res.data.latestUsers || 0,
        
      })
    } catch (err) {
      console.error(err)
     
    } finally {
      
    }
  }

  // Auto-load stats on component mount
  useEffect(() => {
    getAdminStats()
  }, [])
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") return;
   
    const socket = connectSocket();

    // Tell server this user is online
    socket.emit("userOnline", {
      _id: currentUser._id,
      email: currentUser.email,
      avatar: currentUser.avatar,
      role: currentUser.role,
    });
    console.log("User emitted", currentUser.avatar)

    // Listen for updates
    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Cleanup
    return () => {
      socket.off("updateOnlineUsers");
      socket.disconnect()
    };
  }, [currentUser]);

  return (
    <>
    <div style={{ padding: "20px" }} className="mt-20">
      <h2>Total Online Users: {onlineUsers.length}</h2>
       {console.log("Rendering online users:", onlineUsers)}
     <div>
  {onlineUsers.map((user) => (
    <div
      key={user._id}
      className="flex items-center gap-2 mb-2"
    >
      <img
        src={
          user.avatar?.startsWith("http")
            ? user.avatar
            : `http://localhost:8000/uploads/${user.avatar}`
        }
        alt="avatar"
        className="w-[35px] h-[35px] rounded-full object-cover"
      />

      <span className="text-sm text-gray-800">{user.email}</span>
    </div>
  ))}
</div>
    </div>

   <div className=" rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Latest Users
              </h2>
              
              {stats.latestUsers?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.latestUsers.map((user) => (
                    <div key={user._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {user.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No users found</p>
              )}
            </div>
</>
  );
}