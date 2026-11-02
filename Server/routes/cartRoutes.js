
const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  cartitemdelete,
  changequantity,
} = require("../controllers/cartController");

const checkAuth = require("../middleware/authMiddleware");


// All cart routes require authentication
router.post("/", checkAuth, addToCart);
router.get("/", checkAuth, getCart);
router.delete("/:id", checkAuth, cartitemdelete);
router.put("/:id", checkAuth, changequantity);


module.exports = router;
