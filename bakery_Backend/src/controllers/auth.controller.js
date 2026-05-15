const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {sendEmail}=require('../controllers/emailService')

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generatetoken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

async function registerUser(req, res) {
  try{
    // console.log("BODY:", req.body)        // to see what comes in body
    // console.log("PASSWORD:", req.body.password) // to see what comes in password
    const { firstName, lastName, email, password } = req.body;

  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    return res.status(409).send({ message: "User Already Exist" });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  return res.status(201).send({
    message: "User Registered Successfully",
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    },
    token: generatetoken(user._id),
  });
  res.status(500).send({ message: "Server error during signup" });
  }catch(err){
    res.status(500).send({message:err.message})
  }
};


async function loginUser(req,res) {
    try{
        console.log(req.body);
        console.log(req.body.password);
        
        const {email,password}=req.body
        
        const userExist=await User.findOne({email})
        if(!userExist) return res.status(404).send({message:"Invallid User Or Password"})
        
        const isMatch=await userExist.comparePassword(password)
        if(!isMatch) return res.status(404).send({message:"Invallid User Or Password!!"})

        const token=generatetoken(userExist._id)
        res.cookie("token", token, {
          httpOnly: true,        // ✅ safer — token should never be read by JS
          secure: true,          // ✅ required for sameSite: "none"
          sameSite: "none",      // ✅ required for cross-origin (Vercel → Render)
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("isAdmin", userExist.isAdmin, {
          httpOnly: false,       // ✅ keep false — React reads this directly
          secure: true,          // ✅ required on HTTPS
          sameSite: "none",      // ✅ must match token — both cross-origin
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).send({
            message:"Logged In Successfully ",
            user: {
                id: userExist._id,
                email:userExist.email,
                firstName: userExist.firstName,
                isAdmin:userExist.isAdmin,
                token: generatetoken(userExist._id)
            },

                
                
        })

    }catch(err){
        res.status(400).send({message:err.message})
    }
};

function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).send({message:"User Logged Out Successfully !!"})
};


async function registerAdmin(req,res){
    const {firstName,lastName,email,password,isAdmin} =req.body

    if(!firstName||!lastName||firstName.trim()==''||lastName.trim==''||!password||password.trim()==''||!email||regex.test(password)){
        return res.status(400).send({message:"Insert valid Information"})
    }

    const existingAdmin=await User.findOne({email,isAdmin:true})

    if(existingAdmin) return res.status(400).send({message:"Admin Already Exist"})
    
    const admin=await User.create({
        firstName,
        lastName,
        email,
        password,
        isAdmin:true
    })
    return res.status(200).send({
        message:"Admin Registered successfully !!",
        admin:{
            id:admin._id,
            firstName:admin.firstName,
            lastName:admin.lastName,
            isAdmin:admin.isAdmin,
            password:password
        },token:generatetoken(admin._id)
    })
}

async function loginAdmin(req,res) {
try{
        console.log(req.body);
        console.log(req.body.password);
    const {email,password}=req.body

    const admin=await User.findOne({email:email,isAdmin:true})

    if(!admin) return res.status(400).send({message:"Invalid Email Or Passowrd !!"})
    
    const isMatch= await admin.comparePassword(password)
    if(!isMatch) return res.status(400).send({message:"Invalid Email Or Passowrd !!"})
    
    const token=generatetoken(admin._id);
    res.cookie(
          "token",token,
          {
            httpOnly: false,   // keep token httpOnly for security
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          }
        )
        res.cookie(
          "isAdmin",admin.isAdmin,
          {
            httpOnly: false,  // must be false — React's AuthContext reads this
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          }
        )   
    return res.status(200).send({
        message:"Admin Logged In Successfully !!",
        data:{
            email:admin.email,
            isAdmin:admin.isAdmin
        },"token":token
    })

}catch(err){
    res.status(500).send({message:err.message})
}
}

function logoutAdmin(req,res){
    res.clearCookie("token")
    res.status(200).send({message:"Admin logged Out Successfully !!"})
}

async function getAllUsers (req,res){
  const users = await User.find({isAdmin:false})
  try{}catch(err){}
  if(!users) return res.status(400).send({message:"Errorr User not Found"})

  return res.status(200).send(users)
}



//Password reset Api for req and update
// Step 1 — Request reset
async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // ✅ Direct assignment + save() triggers the pre-save hook
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetLink = `${resetToken}`;/////////////
    await sendEmail(user.email, resetLink);

    return res.status(200).send({ message: "Reset link sent to email" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

// Step 2 — Reset password
async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send({ message: "Invalid or expired token" });

    // ✅ Assign directly so isModified('password') returns true
    //    and the pre-save hook hashes it automatically
    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();              // ← hook fires here, hashes newPassword

    return res.status(200).send({ message: "Password updated" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,

  registerAdmin,
  loginAdmin,
  logoutAdmin,

  getAllUsers,

requestPasswordReset,
resetPassword

};
