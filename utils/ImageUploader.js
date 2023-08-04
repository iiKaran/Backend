const cloudinary = require("cloudinary").v2; 

exports.uploadImagetoCloudinary = async (file ,height ,quality)=>{
 
 require("dotenv").config();
 folder = process.env.CLOUD_FOLDER
 quality =10
 let options = {folder}
 if(height)
 options.height = height ; 
 if(quality)
 options.quality = quality; 

 options.resourse_type = "auto"; 
 console.log(file.tempFilePath)
 return await cloudinary.uploader.upload(
  file.tempFilePath, options);
}