const express = require("express"); 
const router = express.Router(); 
const {auth,isAdmin} = require("../middlewares/auth");
const {addProduct, deleteProduct,getAllProducts,getlikedProducts,putImage, changePrice, addToCart, removeFromCart, getCart, addCategory, deleteCategory, allProductsOfCategory, likeProduct,getImageOfColor, addToWishlist , getWishlist, getProduct} = require("../controllers/Product"); 
router.post("/add-product",auth, addProduct); //checked
router.post("/add-category",auth ,addCategory); // checked
router.delete("/delete-product",auth,deleteProduct); // checked
router.get("/all-products",getAllProducts); // checked
router.put("/update-price",auth,changePrice); // checked
router.post("/add-to-cart",auth ,addToCart); // checked
router.delete("/remove-from-cart",auth, removeFromCart); // checked
router.get("/cart",auth,getCart);// checked
router.delete("/delete-category",deleteCategory); // checked
router.get("/category-products", allProductsOfCategory); // checked 
router.put("/likeProduct",auth, likeProduct); // checked
router.get("/all-liked-products",auth ,getlikedProducts) // checked
router.post("/add-Image",putImage); // checked
router.get("/getImageOfColor", getImageOfColor);
router.post("/add-to-wishlist", auth ,addToWishlist); 
router.get("/get-wishlist",auth, getWishlist); 
router.get("/get-product",getProduct); 
module.exports = router; 
