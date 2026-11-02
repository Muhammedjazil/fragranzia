const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Product } = require("../models/Product");


//==========cart==========


// ================= ADD TO CART =================

const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);  // // 1.frontendil pass chytha token matchs to the middleware token then genarate genrate userid//correct user ano findchyyan

    if (!user) {               //tokens not match
      return res.status(404).json({ message: "User not found" });
    }

    const items = Array.isArray(req.body) ? req.body : [req.body];      // req.body single obj{ product: "PRODUCT_ID_1", quantity: 1 } ,[req.body] array anenkl[  { _id: "PRODUCT_ID_1", quantity: 1 },{ _id: "PRODUCT_ID_1", quantity: 1 }]


    if (items.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    for (const item of items) {               //forofloop
      const productId = item._id || item.product;    //procutidyileek product id store
      const quantity = Number(item.quantity ?? 1);    //quantity=quantity number aki store aakunnu

      if (
        !productId ||
        !mongoose.Types.ObjectId.isValid(productId) ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid product ID or quantity",
        });
      }

      const productExists = await Product.findById(productId);   // aa idle product details edukunnu

      if (!productExists) {
        return res.status(404).json({
          message: "Product not found",
          productId,
        });
      }

      // Check if this product is already in the user's cart
      const existingItem = user.cart.find(              
        (cartItem) => cartItem.product.toString() === productId.toString()  //user vedum same product click chythal aa id cart lee productil undo nokkum indenkil true
      );

      if (existingItem) {
        // Increase quantity when adding an existing product again
        existingItem.quantity += quantity;
      } else {
        // Add a new product to the existing cart
        user.cart.push({   
          product: productId,
          quantity,
        });
      }
    }

    // Calculate cart total
    let total = 0;

    for (const item of user.cart) {
      const productData = await Product.findById(item.product);

      if (productData) {
        total += Number(productData.saleprice ?? productData.price) *
          item.quantity;
      }
    }

    user.cart_total = total;

    await user.save();

    const updatedUser = await User.findById(req.userId)
      .select("cart cart_total")
      .populate("cart.product");

    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedUser.cart,
      cart_total: updatedUser.cart_total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET CART =================

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId)      // MongoDB-യിലെ User collection-ൽ തിരയുന്നു.req.userId-യുമായി match ചെയ്യുന്ന user-നെ കണ്ടെത്തുന്നു.അതിനാൽ ഓരോ user-നും സ്വന്തം cart ലഭിക്കുന്നു.
  
      .select("cart cart_total")                     //total price store in cart cart_total
      .populate("cart.product");                     ////populate("cart.product") ഉപയോഗിച്ചാൽ ആ ID-യ്ക്ക് പകരം ബന്ധപ്പെട്ട product-ന്റെ details ലഭിക്കും.

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      cart: user.cart,
      cart_total: user.cart_total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//==============deleteitem=============

const cartitemdelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {          //ID-യുടെ format valid ആണോ എന്ന് പരിശോധിക്കുന്നു.സാധാരണ MongoDB ObjectId 24 hexadecimal characters !-->valid allenkil
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const user = await User.findById(req.userId);         //userId-->og user aano yennu thirichariyunnu (frontendil ninnu ayakunna token matchs to middleware token then generate a userid)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.cart = user.cart.filter(                                   //userinte cart ne filter chythu athile ooro iterationile id ,frontendil ninnu send chytha id aayi match chythu nokkum match aakathauedukkum
      (item) => item.product.toString() !== id
    );

    // Recalculate cart total
    let total = 0;

    for (const item of user.cart) {                   //userinte cartilee ooro iteration such as product,quantity
      const productData = await Product.findById(item.product);   //product store productid,  user click addtocart button then product stote that specific productid
     
      if (productData) {
        total += Number(
          productData.saleprice ?? productData.price
        ) * item.quantity;
      }
    }

    user.cart_total = total;

    await user.save();          //user enna collection

    const updatedUser = await User.findById(req.userId)               //here we change cart_total and cart_product when delete happen so
      .select("cart cart_total")                                       //so take current cart _total and cart_product
      .populate("cart.product");

    res.status(200).json({
      message: "Cart item deleted successfully",
      cart: updatedUser.cart,
      cart_total: updatedUser.cart_total,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


  const changequantity=async(req,res)=>{
    try{
    const {id}=req.params
    const {quantity}=req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"invalid product id"})
    }
    if(!Number.isInteger(quantity) || quantity < 1){
      return res.status(400).json({message:"quantity atleast 1"})
    }
    const user=await User.findById(req.userId)                        //middlewarelee userId ->req.userId  db collectionilee userIdyum req.userIdyum onnanenkil -->userine thirichariyunnu
   if (!user) {
  return res.status(404).json({
    message: "User not found"
  });
}

console.log("Frontend Product ID:", id);

console.log(
  "Cart Product IDs:",
  user.cart.map(item => item.product.toString())
);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const cartItem = user.cart.find(                                    //user.cart-->userinte cart
      (item) => item.product.toString() === id
    );
     
     if (!cartItem) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cartItem.quantity = quantity;

    let total = 0;

    for (const item of user.cart) {
      const product = await Product.findById(item.product);

      if (product) {
        total +=
          Number(product.saleprice ?? product.price) *
          item.quantity;
      }
    }

      user.cart_total = total;
    await user.save();

    const updatedUser = await User.findById(req.userId)
      .select("cart cart_total")
      .populate("cart.product");

    res.status(200).json({
      message: "Quantity updated successfully",
      cart: updatedUser.cart,
      cart_total: updatedUser.cart_total,
    });

     } 
     catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

  }
module.exports = {
 
  addToCart,
  getCart,
  cartitemdelete,
  changequantity
};