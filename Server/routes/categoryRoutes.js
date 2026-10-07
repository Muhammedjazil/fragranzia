const express=require('express')
const {Onhandleadd,Fetchuser,onhandleedit,handleblock}=require("../controllers/categoryController")

const router=express.Router();


router.get("/",Fetchuser)

router.post("/",Onhandleadd);

router.put("/:id",onhandleedit)

router.put("/block/:id",handleblock)


module.exports=router;