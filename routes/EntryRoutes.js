const express = require("express");
const router = express.Router();
const {logIn , signUp,sendOtp, loggedInUser} = require("../controllers/Auth"); 


router.post("/send-otp",sendOtp);
router.post("/create-new-account",signUp); 
router.post("/login",logIn); 
router.post("/loggedIn-user",loggedInUser);
module.exports = router;
