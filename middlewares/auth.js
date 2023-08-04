const jwt = require("jsonwebtoken"); 
exports.auth = async(req,res,next)=>{
 try{
  // extract token 
  console.log("inside middlewares")
  const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", ""); 
  // if token is missing
  if(!token){
   res.status(401).json({
    success: "False", 
    message:"Token is missing"
   })
  }

  // token verify to auntheticate
     try{
      const decode = jwt.verify(token,process.env.SECRET_KEY); 
      console.log(decode); 
      req.user= decode ; 
     }
     catch(err)
     {
      console.log(err); 
      res.status(400).json({
       success: false , 
       message:"Something went wrong"
      })
     }
     next();
 }
 catch(err){
  console.log(err);
  res.status(400).json({
   success: false , 
   message:"Something went wrong"
  })
 }
}
exports.isAdmin = async(req , res , next)=>{
    try{
    //   const role = req.user.role ; 
    const role=req.body.ac;
      if(role !="Admin")
      {
          return res.status(404).json({
            success:false ,
            message:"Protected route for the Admin"
          })
      }
      next();
    }
    catch(err){
        console.log(err); 
        res.status(500).json({
            success:false , 
            message:"Error while login as a admin"
        })
    }
}