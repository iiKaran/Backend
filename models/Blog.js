const mongoose = require('mongoose');

const blogSchema =  new mongoose.Schema({
   author:{
    type:String, 
    trim:true,
   }, 
   imageUrl:{
    type:String, 
    trim:true,
   }, 
   title:{
    type:String, 
    trim:true,
   }, 
   content:{
    type:String, 
    trim:true,
   },
   createdAt:{
       type:Date, 
       default: Date.now(),
   }
},  {timestamps: true}   )

module.exports = mongoose.model("Blog",blogSchema);

