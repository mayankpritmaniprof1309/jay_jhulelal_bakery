const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
    return res.status(400).send({ message: "User Already Exist" });
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
}


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
}
module.exports = {
  registerUser,
  loginUser
};
