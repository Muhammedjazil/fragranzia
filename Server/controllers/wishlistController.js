
const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Product } = require("../models/Product");

const handlewishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const user = await User.findById(req.userId);                     //req.userIdilulla userinte documents==user
                                                                           //Document 1                           //Document 2
                                                                             //name: "Ali"                            name: "renu"
                                                                             //email: "ali@gmail.com"                   email: "renu@gmail.com"
                                                                              //wishlist: ["productId1", "productId2"]        wishlist: ["productId1", "productId2"]

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const product = await Product.findById(productId);                     //- Wishlist-ലേക്ക് add ചെയ്യാൻ ശ്രമിക്കുന്ന product database-ൽ ഉണ്ടോ

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const alreadyLiked = user.wishlist.some(                              //ആ product ID user-ന്റെ wishlist-ൽ നേരത്തെ ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു.
      (id) => id.toString() === productId
    );                                                                      

    if (alreadyLiked) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.wishlist.push(productId);
    }

    await user.save();                                            //aa spesific userinte documentileek add aakunnu                        

    return res.status(200).json({
      message: alreadyLiked
        ? "Product removed from wishlist"
        : "Product added to wishlist",
      wishlist: user.wishlist,             //wishlist — മാറ്റം വരുത്തിയ ശേഷം ആ user-ന്റെ wishlist frontendileek ayakunnu
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user.wishlist);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};





module.exports = { handlewishlist,getWishlist };
