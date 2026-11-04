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

const allowedOrigins = [
  process.env.CLIENT_URL?.replace(/\/$/, ""),
  "https://final-yp-frontend.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

// ─── Database ────────────────────────────────────────────────
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO, { serverSelectionTimeoutMS: 15000 });
  console.log("Connected to database");
};

// ─── App Setup ───────────────────────────────────────────────
const app = express();

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err.message);
    res.status(500).json({ message: "DB connection failed" });
  }
});

// ─── Socket.io (works locally only) ──────────────────────────
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("userOnline", (userData) => {
    if (!userData?._id) return;
    if (userData.role === "admin") socket.join("adminRoom");
    onlineUsers.set(userData._id, { ...userData, socketId: socket.id });
    io.to("adminRoom").emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });

  socket.on("disconnect", () => {
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
app.get("/", (req, res) => res.send("API running"));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);

// ─── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ message, statusCode, success: false });
});

// ─── Start Server (local only) ───────────────────────────────
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;