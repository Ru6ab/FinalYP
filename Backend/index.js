
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env") });

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
    origin: isProduction ? process.env.CLIENT_URL : "http://localhost:5173", // CHANGED
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
if (!process.env.VERCEL) { // CHANGED
  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app; // CHANGED