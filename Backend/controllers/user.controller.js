import Listing from '../models/listing.model.js'
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"



export const verifyUser = async (req, res, next) => {
    console.log("🔍 req.file:", req.file);   // ← add this
  console.log("🔍 req.body:", req.body); 
    if(req.user.id !== req.params.id){
            return  next(errorHandler(403,"Invalid accesss"))
        }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateFields = {
      email: req.body.email,
      password: req.body.password,  
    };

    if (req.file) {
// updateFields.avatar = req.file.filename;      
      updateFields.avatar = req.file.path;
    } else {
      // Don't touch avatar field if no new file
      delete updateFields.avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ msg: "updation is not working" });
    }

    console.log("Updated user avatar saved in DB:", updatedUser.avatar);

    const { password, ...restProfile } = updatedUser._doc;
    res.status(200).json({ success: true, user: restProfile });
  } catch (error) {
    next(errorHandler(500, "controller catch error"));
  }
};


export const deleteUser =  async(req,res,next)=>{
     if(req.user.id !== req.params.id){
            return  next(errorHandler(403,"Invalid accesss"))
        }
    try{
        await User.findByIdAndDelete(req.params.id)
         res.clearCookie("access_token")
         .status(200).json({msg:"user is deleted"})
    }
    catch(error){
        next(errorHandler(500,"catch error"))
    }
}

export const signOut = async (req,res,next)=>{
  try{
   res.clearCookie("access_token");
   res.status(200).json("user logged out successfully")
  }
  catch(error){
    next(error) 
  }
}

export const getListings = async(req,res,next)=>{
     if(req.user.id === req.params.id){
        
  try{
    const listing = await Listing.find({userRef: req.params.id})
    const totalListings = await Listing.countDocuments({userRef: req.params.id})

    const listingType = await Listing.aggregate([
    {
      $group:{
        _id:'$type',
        total:{$sum:1}
      }
    }
    ])
    res.status(200).json({listingArray: listing, totalListings: totalListings,listingType})
  }
  catch(error){
    next(errorHandler(400,"error from catch"))
  }
}

}
 export const getUser = async(req,res,next)=>{
try{
  const user = await User.findById(req.params.id)
  if(!user) return next(errorHandler(404,"user not found!"))
    const {password:pass, ...rest} = user._doc
  res.status(201).json(rest)
}catch(error){
  next(error)
}
 }