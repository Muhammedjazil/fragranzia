require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 7000;

connectDb();

app.use(cors());
app.use(express.json());

// Root test route so visiting https://...vercel.app returns a confirmation
app.get("/", (req, res) => {
  res.send("Fragrance Backend API is running successfully!");
});

app.use("/category", categoryRoutes);

// uploads folder publicly accessible
app.use("/uploads", express.static("uploads"));

app.use("/product", productRoutes);

app.use("/api/auth", authRoutes); // authentication (signup)

app.use("/api/cart", cartRoutes); // Add, Get, Delete, Update cart

app.use("/wishlist", wishlistRoutes);

app.use("/address", addressRoutes);

app.use("/api/orders", paymentRoutes); // order

// Only listen locally, avoid listening on Vercel serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel Serverless Function
module.exports = app;
