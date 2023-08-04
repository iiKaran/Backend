const express = require("express");
const router = express.Router();
const {logIn , signUp,sendOtp} = require("../controllers/Auth"); 


router.post("/send-otp",sendOtp);
router.post("/create-new-account",signUp); 
router.post("/login",logIn); 

module.exports = router;
