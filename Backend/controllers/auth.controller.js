import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export const signup = async (req, res, next) => {
  const { email, password } = req.body;

  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 chars with number & special char.",
    });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ email, password: hashedPassword });

  try {
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    // Exclude password from response
    const { password: _, ...restProfile } = newUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(restProfile);
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    console.log(" SIGNIN body received:", req.body);
    const validUser = await User.findOne({ email });
    if (!validUser)
      return res.status(404).json({ success: false, message: "User not found" });
   
    const comparePass = bcryptjs.compareSync(password, validUser.password);
    if (!comparePass)
      return res.status(401).json({ success: false, message: "Wrong credentials" });

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: _, ...restProfile } = validUser._doc;

    return res
      .cookie("access_token", token, { httpOnly: true, maxAge: 7 * 24 * 60 *60 * 1000  })
      .status(200)
      .json({ success: true, ...restProfile });

  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const googleAuth = async (req, res, next) => {
  
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user){
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log(token,"token generated for google auth")
      const { password: _, ...restProfile } = user._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(restProfile);
    }

    const generatedPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPass, 10);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.avatar || undefined,
      
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);   
    const { password: _, ...restProfile } = newUser._doc;
       res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(restProfile);
  } catch (error) {
    next(error);
  }
};
