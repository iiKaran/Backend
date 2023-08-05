const mongoose = require("mongoose"); 



const productSchema = new mongoose.Schema ({

     title:{
      type:String, 
     }, 
     description: {
      type:String, 
     }, 
     category:{
      type:mongoose.Schema.Types.ObjectId, 
      ref:"Category",
     }, 
     auction:{
      type:String , 
      trim : true,
     },
     material:{
      type:String , 
      trim : true,
     },
    fabric:{
      type:String , 
      trim : true,
     },
     customization:[{
      type:String , 
      trim : true,
     }], 
     sku:{
      type:String , 
      trim : true,
     },
     reviews:{
      type:mongoose.Schema.Types.ObjectId, 
      ref:"RatingAndReviews",
     },
     price:{
       type:Number , 
       required:true
     },
     offerPrice:{
      type:Number , 
    },
    photos:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:"ImageColor",
     trim:true
    }],
    availability:{
      type:Boolean, 
      default:true
    }, 
    quantity:{
     type:Number, 
    },
    likedby:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

})

module.exports = mongoose.model("Product", productSchema);