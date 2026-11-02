// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");                       //=========register+cart+wishlist ellethiteyum collection=========

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
      // minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      // required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    // Date of Birth field
   dateOfBirth: {
   type: Date,
    // required: [true, "Date of birth is required"],
   },

   // Gender field
   gender: {
  type: String,
  enum: ["Male", "Female", "Other"],
  // required: [true, "Gender is required"],
   },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users without a googleId
    },
    loginMethod: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    image: { type: String },
    status: {
      type: Boolean,
      required: [true, "Status is required"],
      default: true,
    },
    isActive: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    cart: [                          //here product,quatity store inside the cart
      {                                                        //cartileek kerunna productid store
        product: {                                          //imp:-Product collection-ലെ product ID store ചെയ്യുന്നു.
          type: mongoose.Schema.Types.ObjectId,               //aa idyilee iterationil name,price,saleprice etc... ind so access
          ref: "Product",                               //here we take reference product collection 
          required: true,                               //ref eduthal namukk repeated aayi data store aakenda, happen:-namukk front endil ninnu ayakunath specific productinte id aanu, aa id yilee content product collection enna tablilil und ath nammal edukkunnu
        },                                              //so it avoid repeted aayi data store aakunnath
        quantity: {                                       //എത്ര എണ്ണം വാങ്ങുന്നു എന്ന് store ചെയ്യുന്നു.
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    cart_total: {
      type: Number,
      default: 0
    },
    wishlist: [                                //— Like ചെയ്ത products-ന്റെ IDs store ചെയ്യുന്ന field.
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);


module.exports = {
  User: mongoose.model("User", userSchema),
};