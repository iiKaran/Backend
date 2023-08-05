const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const ImageColor = require("../models/ImageColor");
const {uploadImagetoCloudinary} = require("../utils/ImageUploader"); 
// add product 

exports.addProduct = async (req, res) => {

 try {
  const { name, description, category, price, offerprice, status } = req.body;

  const userId = req.user.id;

  console.log(userId);
  availble = true
  if (status) {
   availble = status
  }
 const newProduct = await Product.create({ name, description, category, price, offerprice, availability: availble });
  // adding new product 
  // add the product to the respective category 
const updatedCategory = await Category.findByIdAndUpdate(
   category,{$push: {products: newProduct._id}}, {
   new: true
  });
  res.status(200).json({
   success: true,
   message: "Product added Successfully"
  })
 }
 catch (err) {
  console.log(err);
  res.status(500).json({
   success: false,
   message: "Something went wrong while adding product"
  })
 }
}
// list all product
exports.getAllProducts= async (req, res)=>{
 try{
      const allProducts = await Product.find({}).populate("category").populate("photos"); 
      // populate("RatingAndReviews")
     
      if(!allProducts){
       return res.status(404).json({
        sucess:false , 
        message:"No product found"
       })
      }
      return res.status(200).json({
       success:true,
       message:"Products fetched successfully", 
       data:allProducts
      })
 }   
 catch(err){
  console.log(err);
  res.status(500).json({
   success: false,
   message: "Something went wrong while getting all product"
  })
 }
}
//TODO :  add photo of product

// like a product 
exports.likeProduct = async (req, res)=>{
  try{
       const {productId} = req.body ; 
       const userId = req.user.id ; 
       console.log(userId)
       if(!productId){
        return res.status(404).json({
         success: false,
         message: "Enter valid product",
        })
       }
       const findProduct = await Product.findById(productId); 
       if(!findProduct)
       {
         return res.status(404).json({
           success:false , 
           message:"product not found"
         })
       }
       // user id to the product 
       const  liked = await Product.findByIdAndUpdate(productId,{
        $push:{likedby:userId}
       },{new:true}); 
       console.log(liked)
       const updatedUser = await User.findByIdAndUpdate(userId,{
        $push:{
         likedProduct:productId
        }
    },{new:true})
       return res.status(200).json({
              success:true,
              message:"product liked successfully" 
       })
  }
  catch(err){
    console.log(err); 
    res.status(500).json({
      message:"Something went wrong while liking product"
    })
  }
}
// get all like products

exports.getlikedProducts = async (req, res)=>{
  try{
       
       const userId = req.user.id ; 
      // get user id 
       
      const likedByUser =  await User.findById(userId).populate("likedProduct").exec(); 
        console.log(likedByUser)

      return res.status(200).json({
        success:true, 
        message:"", 
        data:likedByUser.likedProduct
      })
      
  }
  catch(err){
    console.log(err); 
    res.status(500).json({
      message:"Something went wrong while liking product"
    })
  }
}

// delete product
exports.deleteProduct = async (req, res )=>{
     try{
            
      const {productId }= req.body;
      
      if(!productId){
       return res.status(404).json({
        success: false,
        message: "No product found"
       })
      }
      const findProduct = await Product.findById(productId); 
      if(!findProduct)
      {
        return res.status(404).json({
          success:false , 
          message:"product not found"
        })
      }
      // fetch the product and delete it 

      await Product.findByIdAndDelete(productId);  
      return res.status(500).json({
       success:false , 
       message:" product is deleted"
      })
     }
     catch(err){
      console.log(err);
      res.status(500).json({
       success: false,
       message: "Something went wrong while deleting product"
      })
     }
}

// change price for a product
exports.changePrice = async( req , res)=>{

  try{
   const{productId, newPrice} = req.body ; 
   if(!productId){
    return res.status(404).json({
     success: false,
     message: "No product found"
    })
   }
   const findProduct = await Product.findById(productId); 
   if(!findProduct)
   {
     return res.status(404).json({
       success:false , 
       message:"product not found"
     })
   }
   // fetch the product and delete it 

   await Product.findByIdAndUpdate(productId, {
    price:newPrice
   }); 
   return res.status(500).json({
    success:false , 
    message:" product price is updated"
   })
  }
  catch(err){
   console.log(err);
   res.status(500).json({
    success: false,
    message: "Something went wrong while deleting product"
   })
  }
}

exports.putImage = async(req,res)=>{
  try{
      const{ productId , color} = req.body ;
      const image = req.files.productImage ; 
      const imageUpload = await uploadImagetoCloudinary(image);
      const url = imageUpload.secure_url; 
      const ImageSaved = await ImageColor.create({url,color, productId})
      const dbEntry = await Product.findByIdAndUpdate(productId,{
          $push:{photos:ImageSaved._id}
       });
       return res.status(200).json({
          success:true , 
          message:"Image Uploaded Successfully"
       })
  }
  catch(err)
  {
   console.log(err);
   res.status(500).json({
    success: false,
    message: "Something went wrong while adding pictures"
   })
  }
}
exports.getImageOfColor = async(req , res)=>{
  try{
    const {inputColor,prdId}= req.body;
    
    const product = await ImageColor.findOne({productId:prdId,color:inputColor});
    console.log(product) 
    return res.status(200).json({
      success:true , 
      imageUrl:product.url, 
      message:"Image is uploaded on cloud"
    }); 
  }
  catch(err){
   console.log( err); 
   return res.status(500);
  }
}
// add product to cart
exports.addToCart = async( req , res)=>{
 try{
  
   //push the product id to the cart of the user so we also need the user id 
   const userId = req.user.id ; 
   const{productId} = req.body; 
   // validate the product 
   if(!productId){
    return res.status(404).json({
     success: false,
     message: "No product found"
    })
  }
   const updatedUser = await User.findByIdAndUpdate(userId,{
       $push:{
        mycart:productId
       }
   },{new:true})

  return res.status(200).json({
   success:true, 
   message:"added to cart", 
   dat:updatedUser
  })
 }
 catch(err){
  console.log(err);
  res.status(500).json({
   success: false,
   message: "Something went wrong while adding to cart"
  })
 }
}

// remove product from cart
exports.removeFromCart = async( req , res)=>{
 try{
  
   //push the product id to the cart of the user so we also need the user id 
   const userId = req.user.id ; 
   const{productId} = req.body; 

   // validate the product 
   if(!productId){
    return res.status(404).json({
     success: false,
     message: "No product found"
    })
  }
   const updatedUser = await User.findByIdAndUpdate(userId, { $pull: {mycart: productId}},{new:true})
  return res.status(200).json({
   success:true, 
   message:"removed from cart", 
   dat:updatedUser
  })
 }

 catch(err){
  console.log(err);
  res.status(500).json({
   success: false,
   message: "Something went wrong while removing from cart"
  })
 }
}

// get cart of a user 
exports.getCart = async( req , res)=>{
 try{
  
   //push the product id to the cart of the user so we also need the user id 
   const userId = req.user.id ; 
   
   const CartDetails = await User.findById(userId).populate("mycart");
  
  return res.status(200).json({
   success:true , 
   message:"get cart details", 
   data:CartDetails.mycart
  })
 }
 catch(err){
  console.log(err);
  res.status(500).json({
   success: false,
   message: "Something went wrong while fetching cart"
  })
 }
}

// add to wishlist 
exports.addToWishlist = async( req , res) =>{
  try{
      const {productId} = req.body; 
      const userId = req.user.id;
      console.log(userId)
      const wishlistDetails = await User.findByIdAndUpdate(userId,{
       $push:{
        wishlist:productId
       } 
      })
      return res.status(200).json({
        success: true , 
        message:"Added to wishlist"
      })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
     success:false , 
     message:"Error Occur While Adding to wishlist"
    })
  }
}

// get the wishlist 

exports.getWishlist = async(req , res)=>{
     try{
      const userId = req.user.id ; 
      console.log("user id")
      const FetchedCart = await User.findById(userId).populate({ path: 'wishlist',
      populate: {
        path: 'photos',
        // model: 'ImageColor'
      }});
      return res.status(200).json({
        success:true, 
        message:"Cart Fetched Successfully", 
        data:FetchedCart.wishlist
      })
     }
     catch(err){
      console.log(err);
      return res.status(500).json({
        success: false, 
        message:"Error while fetching the wishlist"
      })
     }
}

// add category
exports.addCategory = async(req, res)=>{
  try{
     const{name , description} =req.body;    
     // create the catefory 
     const createdCategory =  await Category.create({
      name , 
      description
     });
     return  res.status(200).json({
      success:true , 
      message:"created category"
     })
  }
  catch(err){
     res.status(500).json({
      success:false , 
      message:"failed to create category"
     })
  }
}
// delete category
exports.deleteCategory = async(req, res)=>{
 try{
    const {categoryId} = req.body ;  
    // create the catefory 
    if(!categoryId){
     return res.status(404).json({
      success:false , 
      message:"Categtory id required"
     })
    }
      await Category.findByIdAndDelete(categoryId);
    return  res.status(200).json({
     success:false , 
     message:"deleted category"
    })
 }
 catch(err){
    res.status(500).json({
     success:false , 
     message:"failed to delete category"
    })
 }
}

// list all the product of a category 

exports.allProductsOfCategory = async(req, res)=>{
 try{
  const {categoryId} = req.body ;  
    // create the catefory 
    if(!categoryId){
     return res.status(404).json({
      success:false , 
      message:"Categtory id required"
     })
    }
    const categoryProducts = await Product.find({
     category:categoryId
    }); 

    return res.status(200).json({
     success:true, 
     message:"fetched successfully",
     data:categoryProducts,
    })
 }
 catch(err)
 {
  return res.status(500).json({
   sucess:false , 
   message:"Something went wrong"
  })
 }
}
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id).populate("photos");

    if (!product) {
      // return next(new ErrorHandler(`No Such Product found`, 404)); 
      return res.status(404).json({
        message:"no product found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Product Found successfully",
      product,
    });
  } catch (e) {
    console.log(e.message);
  }
};