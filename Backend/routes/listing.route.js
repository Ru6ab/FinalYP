import express from 'express'
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controllers/listing.controller.js'
import { upload } from "../utils/cloudinary.js"; 
import { verifyToken } from '../utils/verifyToken.js'
 const router =  express.Router()
 
router.post('/createListing', upload.array('images',6), createListing)
router.delete('/delete/:id',verifyToken,deleteListing)
router.put('/updatelisting/:id',verifyToken, upload.array('images', 6), updateListing)
router.get('/get/:id',getListing) //no need to verify token, as listing is public for anyone
router.get('/get/', getListings)




 export default router