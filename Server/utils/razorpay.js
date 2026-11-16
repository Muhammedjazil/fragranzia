const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.warn("Warning: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Razorpay instance not initialized.");
}

module.exports = razorpay;
