const express = require("express"); 
const dbConnect = require("./config/DbConnection");
const app = express(); 
const entryRoutes= require("./routes/EntryRoutes");
const cookieParser = require("cookie-parser"); 
const productRoutes = require("./routes/ProductRoutes"); 
const orderRoutes = require("./routes/OrderRoutes");
const  clouldinaryConnect = require("./config/Cloudinary"); 
const fileUpload = require("express-fileupload");
const blogRoutes = require("./routes/BlogRoutes");
const cors = require("cors"); 


require("dotenv").config(); 
app.use(express.json()); 
app.use(cookieParser());
app.use(
 cors({
  origin:"http://localhost:3000", 
  credentials:true
 })
); 
app.use(fileUpload({
 useTempFiles:true, 
 tempFileDir:"/tmp"
}))
dbConnect(); 
clouldinaryConnect();
app.use("/api/v1/auth",entryRoutes);
app.use("/api/v1/product",productRoutes);
app.use("/api/v1/order",orderRoutes);
app.use("/api/v1/blogs",blogRoutes);
app.listen(process.env.PORT,()=>{
 console.log("Server started succesfully"); 
})

 