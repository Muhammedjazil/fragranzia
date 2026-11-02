const express=require('express')
const router=express.Router()
const {fetchuserdetails,updateAddress,addAddress,setPrimaryAddress}=require("../controllers/addressController")
const checkAuth=require("../middleware/authMiddleware")


router.get("/",checkAuth,fetchuserdetails)


router.put("/:id", checkAuth, updateAddress);

// Add a new address
router.post("/", checkAuth, addAddress);

//add 19 for setprimaryaddressbutton

router.put("/primary/:id", checkAuth, setPrimaryAddress);

module.exports=router