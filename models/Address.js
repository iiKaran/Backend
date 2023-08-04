const mongoose = require("mongoose"); 
const addressSchema = new mongoose.Schema ({
    name:{
        type:String, 
        trim:true
    },
    city:{
     type:String, 
     trim:true
    }, 
    state:{
     type:String, 
     trim:true
    }, 
    country:{
        type:String, 
        trim:true, 
        default:"India"
    },
    streetAndHouseNo:{
     type:String, 
     trim:true
    }, 
})

module.exports = mongoose.model("Address", addressSchema);