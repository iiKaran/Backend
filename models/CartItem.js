const mongoose = require('mongoose');

const orderItemSchema =  new mongoose.Schema({
    productId:{
          type:mongoose.Schema.Types.ObjectId, 
          ref:"Product"
    }, 
    customization:{
        type:String, 
        trim:true
    }, 
    colorImg:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"ImageColor"
    }, 
    quantity:{
        type:Number, 
        min: 0,
    }
})

module.exports = mongoose.model("CartItem", orderItemSchema);

