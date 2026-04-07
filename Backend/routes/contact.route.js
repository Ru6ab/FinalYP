import express from "express"
import { Router } from "express"
import { contactEmail } from "../controllers/contact.controller.js"
import { verifyToken } from "../utils/verifyToken.js"
const router =  express.Router()

router.post('/send', verifyToken, contactEmail)

export default router