const express = require("express"); 
const router = express.Router(); 
const {auth,isAdmin} = require("../middlewares/auth");

 
const {getAllBlog , getOneBlog, createBlog} = require("../controllers/Blog");
router.post("/getAllBlogs",getAllBlog); 
router.post("/createBlog", createBlog); 
router.post("/getBlog", getOneBlog); 
module.exports = router; 
