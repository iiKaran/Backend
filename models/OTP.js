const mongoose = require("mongoose");
const MailSender= require("../utils/MailSender") 
const otpSchema = new mongoose.Schema ({
   email:{
    type:String , 
    required:true
   }, 
  otp:{
   type:Number,
   required:true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60
 }
})
async function sendVerificationEmail(email, otp) {
  try {
     const mailResponse = await MailSender(email, "verification email from E-commerece website ", otp);
     console.log("Email sent succesfully")
  }
  catch (err) {
     console.log("error while sending the verification email");
     throw err;
  }
}
otpSchema.pre("save", async function (next) {
  if (this.isNew) {
   await sendVerificationEmail(this.email, this.otp);
 }
  next();
});
module.exports = mongoose.model("OTP", otpSchema);