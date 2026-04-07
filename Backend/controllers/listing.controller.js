import { start } from "repl";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import path from "path"; 


export const createListing = async (req, res, next) => {
  try {
    // Get image file paths from multer
    //const imgUrls = req.files ? req.files.map((file) => file.path) : [];
    // const imgUrls = req.files ? req.files.map((file) => `uploads/${file.filename}`) : [];
    const imgUrls = req.files ? req.files.map(file=> file.path):[]
     console.log("Files received:", req.files);
    console.log(imgUrls);
    console.log("Files received:", req.files);
    console.log(imgUrls);
    const listingData = {
      ...req.body,
      imgUrls,
    };
    console.log(listingData);
    const newListing = await Listing.create(listingData);
    req.app.get('io').to('adminRoom').emit('newListing', {_id:newListing._id,name:newListing.name, userRef:newListing.userRef})
    return res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req,res,next)=>{
  const listing = await Listing.findById(req.params.id)
  if(!listing){
  return next(errorHandler(404, "listing not found"))
}
  if(req.user.id!==listing.userRef){
return next(errorHandler(401,"invalid access"))
  }

  try{
await Listing.findByIdAndDelete(req.params.id)
res.status(200).json('listing has been deleted')
  }
  catch(error){
    next(error)
  }
}

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "Invalid access"));
    }

    // New images uploaded
    // const newImgUrls = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];
      const newImgUrls = req.files ? req.files.map(file => file.path) : [];
    // Deleted images URLs from frontend (as JSON string in req.body)
    let deletedImages = [];
    console.log(req.body.deletedImages)
    if (req.body.deletedImages) {
      try {
        deletedImages = JSON.parse(req.body.deletedImages);
      } catch (err) {
        console.log("Failed to parse deletedImages:", err);
      }
    }
       for(const imgUrl of deletedImages){
        try{
          const splitUrl = imgUrl.split("/");
           const filenameWithExt = splitUrl[splitUrl.length - 1];
        const folder = splitUrl[splitUrl.length - 2];
        const publicId = `${folder}/${filenameWithExt.split(".")[0]}`;
        await cloudinary.uploader.destroy(publicId);
        console.log("Deleted from Cloudinary:", publicId);
      } catch (err) {
        console.error("Failed to delete from Cloudinary:", err.message);
      }    
        }
       

    // Filter out deleted images from existing imgUrls
    const filteredExistingImgs = listing.imgUrls.filter(url => !deletedImages.includes(url));

    // Combine filtered existing images + new uploaded images
    const updatedImgUrls = [...filteredExistingImgs, ...newImgUrls];

    // Prepare update data excluding deletedImages (not needed in DB)
    const updateData = {
      ...req.body,
      imgUrls: updatedImgUrls,
    };

    // Remove deletedImages property so it doesn't get stored in DB
    delete updateData.deletedImages;
    console.log("Existing imgs:", listing.imgUrls);
console.log("Deleted imgs:", deletedImages);
console.log("Updated imgs:", updatedImgUrls);

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

 export const getListing = async(req,res,next)=>{
  try{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
      return next(errorHandler(404,"listing not found"))
    }
  res.status(200).json(listing)
  }catch(error){
   next(error)
  }
 }


export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;

    const type =
      req.query.type === 'all' || !req.query.type
        ? { $in: ['rent', 'sale'] }
        : { $eq: req.query.type };

    const offer = req.query.offer === 'true' ? true : undefined;
    const parking = req.query.parking === 'true' ? true : undefined;
    const furnished = req.query.furnished === 'true' ? true : undefined;

    const searchTerm = req.query.searchTerm || '';
    const searchRegex =
      searchTerm.trim() !== ''
        ? { name: { $regex: searchTerm.trim(), $options: 'i' } }
        : {};

    const sortBy = req.query.sort || 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    const query = {
      ...searchRegex,
      type,
      ...(offer !== undefined && { offer }),
      ...(parking !== undefined && { parking }),
      ...(furnished !== undefined && { furnished }),
    };

    console.log('Final Mongo query:', query);

    let listings = await Listing.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(startIndex)
      .limit(limit);

   
     console.log("Final listings being sent:", listings);

    return res.status(200).json(listings);
  } catch (error) {
    console.log('Error in getListings:', error.message);
    next(error);
  }
};


