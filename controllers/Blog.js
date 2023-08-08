const Blog = require("../models/Blog"); 
const {uploadImagetoCloudinary} = require("../utils/ImageUploader"); 

exports.getAllBlog = async(req, res)=>{
    try{
         
    const result = await Blog.find({}); 
    return res.status(200).json({
        success:false , 
        message:"Succesfully fetched", 
        data:result
    })

    }
    catch(err){
        console.log(err); 
        res.status(500).json({
            success:false , 
            message:"Error Occured "
        })
    }
}
exports.getOneBlog = async(req, res)=>{
    try{
      const blogId = req.body; 

      const result = await Blog.findById(blogId); 
     
      if(!result)
      {
        res.status(404).json({
            success:false, 
            message:"No Blog Found"
        })
      }
    
      return res.status(200).json({
           success:true, 
            data:result
      })
    }
    catch(err){
        console.log(err); 
      return  res.status(500).json({
            success:false , 
            message:"Error Occured "
        })
    }
}
exports.createBlog = async(req, res)=>{
    try{
       const {author, title , content , createdAt} = req.body ; 
       
       const img = req.files.blogImg ; 
      
      const imageUpload = await uploadImagetoCloudinary(img);
      const url = imageUpload.secure_url; 
      
      const createdBlog = await Blog.create({
        author:author, 
        title:title, 
        content:content, 
        imageUrl:url , 
      })
      
      return res.status(200).json({
        success:true, 
        message:"created"
      })
    }
    catch(err){
        console.log(err); 
        res.status(500).json({
            success:false , 
            message:"Error Occured "
        })
    }
}
