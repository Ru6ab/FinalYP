import Listing from "../models/listing.model.js";
import User from '../models/user.model.js'

 export const getAdminStats = async (req,res)=>{
   try{
    console.log("hellofrom admin stats")
    const totalUsers = await User.countDocuments()
    const  totalListings = await Listing.countDocuments()
    const rentListings = await Listing.countDocuments({type:"rent"})
    const sellListings = await Listing.countDocuments({type:"rent"})
    const latestListings =await Listing.find().sort({createdAt:-1}).limit(4)
    const latestUsers = await User.find().sort({createdAt:-1}).limit(4)
    res.status(200).json({totalUsers,totalListings,rentListings,sellListings,latestListings,latestUsers})
   }catch(err){
      console.error(err)
      res.status(500).json({message:"Server error"})
   }
 }

 export const getAdminListings = async(req,res)=>{
  try{
     const listings =await Listing.find()
     res.status(200).json({"listings":listings})
  }catch(err){
      console.error(err)
  }
 }

 