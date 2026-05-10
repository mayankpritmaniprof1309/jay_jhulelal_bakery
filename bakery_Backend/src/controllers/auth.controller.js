const User = require("../models/User");
const jwt = require("jsonwebtoken");


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
        res.cookie("token",token)
        res.status(200).send({
            message:"Logged In Successfully ",
            user: {
                id: userExist._id,
                email:userExist.email,
                firstName: userExist.firstName,
            },
                token: generatetoken(userExist._id),
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
    res.cookie("token",token)   
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
module.exports = {
  registerUser,
  loginUser,
  logoutUser,

  registerAdmin,
  loginAdmin,
  logoutAdmin
};
