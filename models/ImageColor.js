const mongoose = require("mongoose"); 
const ImageColorSchema = new mongoose.Schema ({
    url:{
        type:String, 
        trim:true
    },
    productId:{
     type:mongoose.Schema.Types.ObjectId, 
     ref:"Product"
    },
    color:{
     type:String, 
     trim: true
    }
})

module.exports = mongoose.model("ImageColor", ImageColorSchema);