const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },        // Changed from sale_price to saleprice (optional)
    description: { type: String },                 // Changed from product_price to price
    price: { type: Number, required: true },     
    saleprice: { type: Number },                     
                                                           //addproduct-->category-->category collectionilee row id aanu
    category:{type: mongoose.Schema.Types.ObjectId,ref:"Category",required:true},//ref:"Category means category collectontee row idyaanu objectid
                                                                                        // category:68d12abc2441
    //  category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String },                     // Single image string matching multer/controller
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = {
  Product: mongoose.model("Product", productSchema),
};