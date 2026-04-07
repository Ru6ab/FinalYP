import jwt  from "jsonwebtoken"
import { errorHandler } from "./error.js"

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token
     console.log('Token from cookie:', token);
    if(!token) {
        return next(errorHandler(401,"Unauthorized token is undefined"))
    }
    

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,"Forbidden "))
  
    req.user = user  //put user on client equal to database, user is same
    console.log("User:", req.user);
console.log("Requested ID:", req.params.id);
    //  if(req.user.id !== req.params.id){
    //         return  next(errorHandler(403,"Invalid accesss"))
    //     }
    next()
})
}