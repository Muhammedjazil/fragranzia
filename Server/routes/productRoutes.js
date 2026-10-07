const express = require('express');
const router = express.Router();

const upload = require("../middleware/upload");

// Correctly import the controller functions
const { addProduct, fetchproduct,handleblock,handleUpdate,fetchimage} = require("../controllers/ProductController");

//imp:- Multer configuration for image uploads at upload.js


// Product routes
router.get("/", fetchproduct); // To get/fetch products

router.post("/add", upload.single("image"), addProduct); //  upload.single("image") passed as  midleware so first go to upload.jsx ,then call the fn
                                                         //so the db store the imageID-->image at upload
router.put("/block/:id",handleblock)


// router.put("/:id",onsubmitupdate)

router.put("/:id", upload.single("image"), handleUpdate);


router.get("/image/:id",fetchimage)//from productpage2-->to take the iteration

module.exports = router;