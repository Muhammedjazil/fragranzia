require("dotenv").config();
const express=require('express')
const cors=require('cors')
const connectDb=require("./config/db")
const categoryRoutes=require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes"); //
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

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})