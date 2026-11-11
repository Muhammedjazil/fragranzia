const bcrypt = require("bcryptjs"); //password encrypt/hash ചെയ്യാൻ ഉപയോഗിക്കുന്നു.
const jwt = require("jsonwebtoken"); //login വിജയിച്ചാൽ token ഉണ്ടാക്കാൻ ഉപയോഗിക്കുന്നു. token usedmove wishlist,cart
const { User } = require("../models/User");

const mongoose = require("mongoose");
const { Product } = require("../models/Product");


let register = async (req, res) => {
  
try {
    const { name, email, password } = req.body;

  console.log(req.body);
  

  const userExist = await User.findOne({ email });                              //database-ൽ User collectionil ആ email ഉള്ള user ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു.indenkil userExist==true
  if (userExist) return res.status(400).json({ message: "User exists" });                 //if match

  const hashedPassword = await bcrypt.hash(password, 10);                        //password-നെ സുരക്ഷിതമായി hash ചെയ്യുന്നു.

  await User.create({ name, email, password: hashedPassword });                  //create-->പുതിയ user-ന്റെ data database-ൽ save ചെയ്യാൻ ഉപയോഗിക്കുന്നു.

  console.log(userExist);
  
  res.status(201).json({ message: "Registered Successfully" });

} catch (error) {
  console.log(error);
  
}
}

// let login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });             //Database-ൽ ആ email ഉള്ള user ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു. indenkil user==true
//   if (!user) return res.status(400).json({ message: "Invalid Email" });

//   const isMatch = await bcrypt.compare(password, user.password);            //user.password → database-ൽ save ചെയ്ത hashed password.bcrypt.compare() → നൽകിയ password database-ലെ hash-ുമായി match ചെയ്യുന്നുണ്ടോ, ismatch==true
//   if (!isMatch) return res.status(400).json({ message: "Invalid Password" });
 
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1y" });   //{ _id: user._id }-->Token-ൽ user-ന്റെ ID ഉൾപ്പെടുത്തുന്നു

//   res.json({ token,role:user.role });//  res.json({ token:token,role:user.role }); aa specific userintre role frontendileek ayakkum
// }

//========weadd=============when admin block then user can't login============//

let login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    // Check whether admin has blocked this account
    if (user.isActive === false) {
      return res.status(403).json({
        message: "Your account has been blocked. Please contact the administrator."
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    // Generate JWT only for active users
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );

    res.status(200).json({
      token,
      role: user.role
    });

  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      message: "Login failed. Please try again."
    });
  }
};

//==============================================================================//

let home = (req, res) => {
  
  User.findById(req.userId)
  res.json({ message: "Welcome to Home Page " });
}


const fetchuserdetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//add new profil data
const addnewdata=async(req,res)=>{
  try{
        // Find the logged-in user
    const updatedUser=await User.findOneAndUpdate(
      {
         _id: req.userId,
      },
      {
        $set: {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        dateOfBirth:req.body.dateOfBirth,
        gender:req.body.gender

      }
    },
    {
      new:true,
      runValidators:true
    }

    )
     if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  }

 catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error: error.message
    });
  }
};

const fetchcustomer=async(req,res)=>{
  try{
  const user=await User.findById(req.userId)
  if(!user){
    return res.json({message:"user not found"})
  }
  const data=await User.find()
  res.json(data)
}
catch(error){
  res.json({message:"customer error"})
}
}

//================last this==============

const changeisactive = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the customer selected in the table
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Toggle Active / Blocked
    user.isActive = !user.isActive;

    // Save the updated status in MongoDB
    await user.save();

    return res.status(200).json({
      message: "Customer status updated successfully",
      user: {
        _id: user._id,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Change status error:", error);

    return res.status(500).json({
      message: "Status not updated",
      error: error.message,
    });
  }
};


module.exports = {
  register,
  login,
  home,
  fetchuserdetails,
  addnewdata,
  fetchcustomer,
  changeisactive

};