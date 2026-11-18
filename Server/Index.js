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

// Ensure DB is connected before handling any route (essential for Vercel serverless)
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error("Database connection error in middleware:", error);
    return res.status(500).json({
      message: "Database connection failed: " + (error.message || "Unknown error"),
      hint: "Add MONGO_URI in Vercel Backend Environment Variables and ensure MongoDB Atlas allows 0.0.0.0/0 in Network Access"
    });
  }
});

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
