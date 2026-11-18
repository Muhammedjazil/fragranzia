const mongoose = require("mongoose");

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing in environment variables!");
    throw new Error("MONGO_URI is missing in environment variables!");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

module.exports = connectDb;
