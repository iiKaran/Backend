const express = require("express");
const router = express.Router();
const {logIn , signUp,sendOtp, loggedInUser,resetPassword} = require("../controllers/Auth"); 
const {auth} = require("../middlewares/auth")

router.post("/send-otp",sendOtp);
router.post("/create-new-account",signUp); 
router.post("/login",logIn); 
router.post("/loggedInUser",auth,loggedInUser);
router.post("/resetpassword",resetPassword);
module.exports = router;
