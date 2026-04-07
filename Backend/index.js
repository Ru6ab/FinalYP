// import dotenv from "dotenv";
// dotenv.config();
// console.log("EMAIL:", process.env.EMAIL);
// console.log("PASS:", process.env.EMAIL_PASS);
// import express from "express";
// import mongoose, { mongo } from "mongoose";
// import cors from "cors";
// import userRouter from "./routes/user.route.js";
// import authRouter from "./routes/auth.route.js";
// import adminRouter from "./routes/admin.route.js";
// import listingRouter from "./routes/listing.route.js";
// import contactRouter from "./routes/contact.route.js";
// import User from "./models/user.model.js";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url";
// import { verifyToken } from "./utils/verifyToken.js";

// import http from "http";
// import { Server } from "socket.io";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log("connected to database");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your React app URL
//     credentials: true,
//   }),
// );
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });
// const onlineUsers = new Map();
// console.log("online users:",onlineUsers)
// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   socket.on("userOnline", (userData) => {
//     if (!userData?._id) return;

//     if(userData.role==="admin"){
//       socket.join('adminRoom')
//       console.log('Admin room joined', userData.email);
//     }

//     onlineUsers.set(userData._id, {
//       ...userData,
//       socketId: socket.id,
//     });

//    io.to('adminRoom').emit('updateOnlineUsers',Array.from(onlineUsers.values()))


//   });

 

//   socket.on("disconnect", () => {
//     console.log("Disconnected:", socket.id);

//     for (let [userId, user] of onlineUsers.entries()) {
//       if (user.socketId === socket.id) {
//         onlineUsers.delete(userId);
//         break;
//       }
//     }

//     io.to('adminRoom').emit('updateOnlineUsers',Array.from(onlineUsers.values()))
//   });
// });

// app.set("io", io);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static(path.resolve("uploads")));

// const port = 8000;
// try {
//   server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// } catch (error) {
//   console.error("Error starting server:", error);
// }

// app.use("/api/user", userRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/listing", listingRouter);
// app.use("/api/admin", adminRouter);
// app.use('/api/contact', contactRouter)
// app.get("/testuploads", (req, res) => {
//   res.sendFile(path.resolve("uploads/1748237813588_sss-removebg-preview.png"));
// });

// const makeAdmin = async () => {
//   try {
//     const email = "rubab.mehmod@gmail.com";
//     const admin = await User.findOneAndUpdate(
//       { email },
//       { role: "admin", password: "MoonLight9!" },
//       { new: true },
//     );
//     if (admin) {
//       console.log("Admin created:", admin.email);
//     } else {
//       console.log("User not found");
//     }
//     return console.log("status updated to admin");
//   } catch (err) {
//     console.log("Error making admin:", err.message);
//   }
// };
// // makeAdmin()

// //middleware for error in signup route,,     defined in index.js, it checks globally in all routes
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     message,
//     statusCode,
//     success: false,
//   });
// });


import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env") }); // ✅ only once, with correct path

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import listingRouter from "./routes/listing.route.js";
import contactRouter from "./routes/contact.route.js";

const isProduction = process.env.NODE_ENV === "production";
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("isProduction:", isProduction);

// ─── Database ────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("DB connection error:", err));

// ─── App Setup ───────────────────────────────────────────────
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: isProduction ? false : "http://localhost:5173",
    credentials: true,
  })
);

// ─── Socket.io ───────────────────────────────────────────────
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: isProduction ? false : "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("userOnline", (userData) => {
    if (!userData?._id) return;
    if (userData.role === "admin") {
      socket.join("adminRoom");
      console.log("Admin joined room:", userData.email);
    }
    onlineUsers.set(userData._id, { ...userData, socketId: socket.id });
    io.to("adminRoom").emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    for (let [userId, user] of onlineUsers.entries()) {
      if (user.socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.to("adminRoom").emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });
});

app.set("io", io);

// ─── Static: Uploads ─────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── API Routes ──────────────────────────────────────────────
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);

// ─── Serve React (Production) ────────────────────────────────
if (isProduction) {
  const clientDist = path.join(__dirname, "../Frontend/newapp/dist");
  console.log("Serving React from:", clientDist);
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// ─── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ message, statusCode, success: false });
});

// ─── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));