const nodemailer = require("nodemailer"); 
const MailSender = async (email,title , body)=>{
 try{

   let transporter = nodemailer.createTransport({
    // host:process.env.HOST,
    service:"gmail",
    auth:{
      user:process.env.USER, 
      pass:process.env.PSW
    }

   })
   
   let info = await transporter.sendMail({
    to: `${email}`, 
    from:`Ecommerce - wictronix-karansehgal`, 
    subject:`${title}`, 
    html : `${body}`
   }); 
   return info;
 }
 catch(err){
  console.log(err); 
 }
}
module.exports = MailSender; 