const express=require('express')
const router=express.Router()
const {handlewishlist,getWishlist}=require("../controllers/wishlistController")
const checkAuth=require("../middleware/authMiddleware")

router.post("/", checkAuth, handlewishlist);
router.get("/", checkAuth, getWishlist);

module.exports=router