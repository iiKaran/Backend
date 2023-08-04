const mongoose = require("mongoose"); 

const RatingAndReviewsSchema = new mongoose.Schema ({

      rating:{
       type:Number , 
       required:true
      }, 
      review:{
       type:String , 
       trim:true
      },
      user:{
       type:mongoose.Schema.Types.ObjectId, 
       ref:"User"
      }
})