import mongoose, { mongo } from "mongoose";

const userShema = new mongoose.Schema({
    username:{
        type:String,
        required:false,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        enum:['user','admin'],
        type:String,
        default: "user"
    },
    avatar : {
        type: String,
       default :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
   }},    
 {timestamps:true})  
 

 const User  = mongoose.model("User",userShema)
 export default User;