const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },
    mycart:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product"
    }], 
    likedProduct:[
       {
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Product"
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Order"
        }
    ], 
    accountType:{
        type:String, 
        Enum:["Admin","Customer"]
    },
    addresses:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Address"
    }], 
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Product"   
        }
    ]
}, {timestamps : true});

module.exports = mongoose.model("User", UserSchema);