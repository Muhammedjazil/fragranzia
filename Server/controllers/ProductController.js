const { Product } = require("../models/Product");

const fetchproduct = async (req, res) => {
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
    const { name, description, price, saleprize, category, stock } = req.body;
    
    // Fixed: matches your schema's single string field 'image'
    const image = req.file ? req.file.filename : null; //file at req.file.filename aanu indaku
    

    const newProduct = new Product({
      name,
      description,
      price,
      saleprice: saleprize,
      category,
      stock,
      image, // Matches schema field name 'image'
    });

    await newProduct.save();
    console.log("Product saved successfully!");
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  }
  catch(error){
    console.error("Error saving product:", error.message);
    res.status(500).json({ message: error.message });
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
    if (req.file) {
      updateData.image = req.file.filename;
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

module.exports = { fetchproduct, addProduct,onsubmitupdate,handleblock,handleUpdate,fetchimage };