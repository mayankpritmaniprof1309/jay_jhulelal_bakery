const User=require('../models/User')
const jwt=require('jsonwebtoken')

async function authProtectMiddleware(req,res,next){
    let token;
      if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // ← from our header
  } else if (req.cookies?.token) {
    token = req.cookies.token;                        // ← fallback to cookie
  }

    if(!token) return res.status(401).send({message:"Please Login In First"})
  try{
        const decode=jwt.verify(token, process.env.JWT_SECRET)
        req.user= await User.findById(decode.id)
        next()
    }catch(err){
        return res.status(401).send({message:"Invalid Token"})
    }

}

async function checkAdminMiddleware(req,res,next){
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        return res.status(403).send({message:"Access Denied : ADMINS ONLY !!!"})
    }
}
module.exports={
    authProtectMiddleware,
    checkAdminMiddleware
}