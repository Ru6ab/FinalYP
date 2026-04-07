import jwt from 'jsonwebtoken'
import User from './models/user.model.js'

 export const protect =async(req,res,next)=>{ // verifytoken
    try{
          const token =
      req.cookies?.access_token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer") &&
        req.headers.authorization.split(" ")[1]);
       
   
        if(!token){
            return res.status(401).json("access denied")
        }
       
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password")
        console.log("user in protect middleware:",req.user)
        if(!req.user){
            return res.status(401).json("no user found")
        }
       next()
    }catch(error){
         res.status(401).json({ message: 'Not authorized, token failed' });
  }
    
 }
export const adminOnly = (req, res, next) => {
  try {
    
    if (req.user && req.user.role === "admin") {
     
      next();
    } else {
      return res.status(403).json({ message: "Admin access only" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Admin access only" });
  }
};

