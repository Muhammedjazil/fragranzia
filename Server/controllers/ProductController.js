const { Product } = require("../models/Product");
//we can see only blocked data
const fetchproduct = async (req, res) => {
   try {                                       //categoryee populate chyyanam
     let products = await Product.find({isActive:false}).populate("category"); // addproduct-->data send to frontend// Fixed: renamed from 'res' to 'products'
     // populate category name only     
     res.json(products);
   }
   catch(error){
     res.status(500).json({ message: error.message });
   }
};
//=====we add25=========so we can see blocked and unblocked data
const fetchProductadmin=async(req,res)=>{
    try {                                       //categoryee populate chyyanam
     let products = await Product.find().populate("category"); // addproduct-->data send to frontend// Fixed: renamed from 'res' to 'products'
     // populate category name only
     res.json(products);
   }
   catch(error){
     res.status(500).json({ message: error.message });
   }
};




const addProduct = async (req, res) => {
  try {
    // console.log("Product body:", req.body);
    console.log("Uploaded image:", req.file);

    const {
      name,
      description,
      price,
      saleprize,
      category,
      stock
    } = req.body;

    if (!name || !price || !category || stock === undefined || stock === "") {
      return res.status(400).json({
        message: "Please fill in the required fields"
      });
    }

    const image = req.file ? req.file.path : null;

    const newProduct = new Product({
      name,
      description,
      price: Number(price),
      saleprice: saleprize === "" || saleprize === undefined
        ? 0
        : Number(saleprize),
      category,
      stock: Number(stock),
      image
    });

    await newProduct.save();
  console.log("end============")
    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct
    });

  } catch (error) {
    console.error("Add product error:", error);

    return res.status(500).json({
      message: error.message || "Product creation failed"
    });
  }
};



const onsubmitupdate=async(req,res)=>{
  let {id}=req.params
  
  try{
    let user=await Product.findByIdAndUpdate(
      id,
      req.body,
      {new:true}
    )
    res.json(user)
  }
  catch(error){
    res.json({message:error.message})
  }
}

const handleblock=async(req,res)=>{
const {id}=req.params
const {isActive}=req.body
try{
  let user=await Product.findByIdAndUpdate(
    id,
    {isActive:!isActive},
    {new:true}
  )
  res.json(user)
}
catch(error){
  res.json({message:error.messege})
}
}



const handleUpdate = async (req, res) => {
  try {

    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      saleprice: req.body.saleprice,
      stock: req.body.stock,
      category: req.body.category
    };

    // If new image is selected
    // if (req.file) {
    //   updateData.image = req.file.filename;
    // }

      //to update the image in clounary we use 27/10

      if (req.file) {
  updateData.image = req.file.path;
}

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json(updatedProduct);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Product update failed"
    });
  }
};

const fetchimage=async(req,res)=>{
    const {id}=req.params

    try{
      let data=await Product.findById(id)
      res.json(data)
    }
    catch(error){
      res.json({message:error.message})
    }
}


const fetchcart=async(req,res)=>{
  const {id}=req.params
  try{
        let data=await Product.findById(id)
        res.json(data)
  }
  catch(error){
    res.json({message:error.message})
  }
}


// ProductController.js

const fetchFilteredProducts = async (req, res) => {
  try {
    const minPrice = Number(req.query.minPrice ?? 0);
    const maxPrice = Number(req.query.maxPrice ?? 5000);
    const sortBy = req.query.sortBy || "Relevance";

    // Validate the price range
    if (
      !Number.isFinite(minPrice) ||
      !Number.isFinite(maxPrice) ||
      minPrice < 0 ||
      maxPrice < minPrice
    ) {
      return res.status(400).json({
        message: "Invalid price range"
      });
    }

    // Filter active products by price isActive: false is not blocked product
    const filter = {
      isActive: false,
      price: {
        $gte: minPrice,
        $lte: maxPrice
      }
    };

    // Apply sorting in MongoDB
    let sort = {};

    if (sortBy === "Price: Low to High") {
      sort = { price: 1 };
    } else if (sortBy === "Price: High to Low") {
      sort = { price: -1 };
    } else if (sortBy === "Newest First") {
      sort = { createdAt: -1 };
    } else if (sortBy === "Popularity") {
      sort = { numReviews: -1, rating: -1 };
    }

    const products = await Product.find(filter)
      .populate("category")
      .sort(sort);

    return res.status(200).json(products);

  } catch (error) {
    console.error("Filter products error:", error);

    return res.status(500).json({
      message: "Unable to filter products"
    });
  }
};


module.exports = { fetchproduct, addProduct,onsubmitupdate,handleblock,handleUpdate,fetchimage,fetchcart,fetchProductadmin,fetchFilteredProducts };