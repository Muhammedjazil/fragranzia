//============order==============
const express=require('express')
const {placeOrder,fetchorderdata,takecustomerdetails,takeshowdetails,updateDeliveryStatus,conformcancel,ordercanceldetails,requestReturn }=require("../controllers/paymentController")
const router=express.Router()
const checkAuth=require("../middleware/authMiddleware")

router.post("/",checkAuth,placeOrder)

router.get("/",checkAuth,fetchorderdata)

router.get("/customer",checkAuth,takecustomerdetails)

router.get("/show/:id",checkAuth,takeshowdetails)

router.put("/status/:id",checkAuth,updateDeliveryStatus )

router.delete("/cancel/:id",checkAuth,conformcancel)

router.get("/specific/:id",checkAuth,ordercanceldetails)

router.post("/return",checkAuth,requestReturn)

module.exports=router