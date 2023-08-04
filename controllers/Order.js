const User = require("../models/User");
const Address = require("../models/Address"); 
const Order = require("../models/Order"); 
const Product = require("../models/Product"); 

exports.createOrder = async(req , res)=>{
 try{
 const userId = req.user.id ; 
  
 const sampleOrder = await Order.create({user:userId,
   amount:0})

 
 return  res.status(200).json({
  success:true, 
  message:"order Created", 
  id:sampleOrder._id
 })
}
catch(err){
console.log(err); 
 res.status(500).json({
  success:false , 
  message: " Error Occur While creating order"
})
}
}
exports.addItemToOrder = async (req , res)=>{
 try{
    const userId = req.user.id ; 
    const {orderId,productId} = req.body; 
    const orderDetails = Order.findById(orderId);
    
   if(!orderDetails){
   return res.status(400).json({
     success:false , 
     message:"No Such Order found"
    })
   }
   // const amt = (await Product.findById(productId).price); 
   // const prevamt = await Order.findById(orderId).amount ;
   const updatedOrder =await Order.findByIdAndUpdate(orderId,{
    $push:{products:productId}, 
    // amount:amt+this.ampunt,
   },{new:true})
   return  res.status(200).json({
    success:true, 
    message:"Item added To The Order"
   })
 }
 catch(err){
  console.log(err); 
   res.status(500).json({
    success:false , 
    message: " Error Occur While adding product to order"
  })
 }
}

exports.addAddress = async (req , res)=>{
 try{
    const userId = req.user.id ; 
    const{name ,city,state, country , streetAndHouseNo}= req.body ; 
   const existedAdress = await Address.findOne({name:name}); 
   if(existedAdress)
   {
    return res.status(500).json({
     success:false , 
     message: "Address with same name existed"
   })
   }
   // then 
   const createdAddress = await Address.create({name , state,country , streetAndHouseNo}); 
   const updatedUser = await User.findByIdAndUpdate(userId,{
    $push:{addresses:createdAddress._id}
   });
   return res.status(200).json({
    success:true, 
    message: "Address Created Sucessfully "

  })
 }
 catch(err){
  console.log(err); 
  return res.status(500).json({
    success:false , 
    message: " Error Occur While adding address"
  })
 }
} 

exports.getAllAddress = async (req , res)=>{
 try{
    const userId = req.user.id ; 
    
    const Useraddresses = await User.findById(userId).populate("addresses").exec(); 
    console.log(Useraddresses)
    return res.status(200).json({
     sucess: true, 
     message:"Addresses are in data", 
     data:[Useraddresses.addresses]
    })
 }
 catch(err){
  console.log(err); 
  return res.status(500).json({
    success:false , 
    message: " Error Occur While fetching addresses "
  })
 }
}

exports.addAddressToOrder = async( req, res)=>{
 try{
      
   const {orderId, addressId}= req.body ; 
   const updatedOrder = await Order.findByIdAndUpdate(orderId,{
    address:addressId
   },{new:true}); 
   
   return res.status(200).json({
     success: true, 
     message:"Address Added", 
      data:updatedOrder
   })
 }
 catch(err){
  console.log(err); 
  return res.status(500).json({
      sucess:true, 
      message:"Error while adding address"
  })
 }
}

exports.placeOrder = async( req , res)=>{
 

}

exports.getOrderDeatils = async(req, res)=>{
 try{
     const {orderId} = req.body; 
     const orderDetails = await Order.findById(orderId).populate("user").populate("products").populate("address").exec(); 
     return res.status(200).json({
      success: true, 
      message:"get order details", 
      data: orderDetails
     })
 }
 catch(err){
  console.log(err); 
  return res.status(500).json({
      success:"false", 
      message:"error while getting order details"
  })
 }
}

