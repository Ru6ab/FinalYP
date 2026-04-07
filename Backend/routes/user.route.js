import express from "express";
import {  deleteUser, getListings, getUser, verifyUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { upload } from "../utils/cloudinary.js"; 


const router  = express.Router();


router.post("/update/:id",verifyToken, upload.single("img"),verifyUser)
router.delete("/delete/:id",verifyToken, deleteUser)
router.get("/userlistings/:id",verifyToken,getListings)
router.get("/:id",verifyToken,getUser)
export default router
