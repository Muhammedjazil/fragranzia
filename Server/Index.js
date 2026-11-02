require("dotenv").config();
const express=require('express')
const cors=require('cors')
const connectDb=require("./config/db")
const categoryRoutes=require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes"); //
const authRoutes = require("./routes/authRoutes");
const cartRoutes=require("./routes/cartRoutes")
const wishlistRoutes=require("./routes/wishlistRoutes")
const addressRoutes=require("./routes/addressRoutes")
const paymentRoutes=require("./routes/paymentRoutes")
const app=express();
// const PORT=process.env.PORT
const PORT=7000

connectDb()
app.use(cors());
app.use(express.json());


app.use("/category",categoryRoutes);

//addproduct.jsx
                                            // 2. ഇമേജുകൾ ബ്രൗസറിൽ കാണാൻ ഈ ലൈൻ അത്യാവശ്യമാണ്
app.use("/uploads", express.static("uploads"));//uploads folder publicly accessible.

app.use("/product",productRoutes);

app.use("/api/auth", authRoutes);        //authentcation(signup)

app.use("/api/cart", cartRoutes); // Add, Get, Delete, Update cart

app.use("/wishlist", wishlistRoutes);

app.use("/address",addressRoutes)

app.use("/api/orders",paymentRoutes)   //========order========

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);


})