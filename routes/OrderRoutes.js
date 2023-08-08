const express = require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middlewares/auth");

const {createOrder,addAddress ,addItemToOrder, placeOrder, addAddressToOrder, getAllAddress, getOrderDeatils} = require("../controllers/Order"); 

router.get("/all-addresses",auth,getAllAddress); // tested
router.post("/add-address",auth,addAddress); // tested
router.post("/create-order",auth,createOrder); // tested
router.put("/add-item",auth,addItemToOrder); // tested
router.post("/addAddressToOrder",auth,addAddressToOrder); //tested
router.get("/order-details",auth,getOrderDeatils); //tested

module.exports = router ;

