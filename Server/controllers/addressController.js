const { Address } = require("../models/Address");
const User = require("../models/User")

   // Fetch addresses  second happen
  const fetchuserdetails=async(req,res)=>{   //userid already store in address collection
    try{
        let data=await Address.find({user:req.userId}).select(
        "user fullName phone street city state zip country isDefault alternativePhone landmark"
    )
    res.json(data)
    }
    catch(error){
        res.json({message:"invalid userId"})
    }
  }
// Update an existing address  third happen
const updateAddress = async (req, res) => {                        //const addressId = req.params; frontend send oru id like 12345
  try {                                                         
    const addressId = req.params.id;                              //const addressId = req.params.id; frontend id aayi oru object ayachal ( front end ayach id objectinte ollilanu { id: "12345" }) so req.params.id

    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,                        //frontend sended userId
        user: req.userId                       //middleware userId both match
      },
      {
        $set: {                                 //$set-->both match then change the data of that field
          fullName: req.body.fullName,           //req.body.fullname-->fronend send data as object(keyvaliuepair) direct aa keyee access chyythu value edukkunnu       
          phone: req.body.phone,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          country: req.body.country,
          alternativePhone: req.body.alternativePhone,
          landmark: req.body.landmark
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    return res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress
    });

  } catch (error) {
    console.error("Update address error:", error);

    return res.status(500).json({
      message: "Failed to update address",
      error: error.message
    });
  }
};



// Add a new address    first happen
const addAddress = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      street,
      city,
      state,
      zip,
      country,
      alternativePhone,
      landmark
    } = req.body;

    const address = await Address.create({
      user: req.userId,
      fullName,
      phone,
      street,
      city,
      state,
      zip,
      country,
      alternativePhone,
      landmark
    });

    return res.status(201).json({
      message: "Address added successfully",
      address
    });

  } catch (error) {
    console.error("Add address error:", error);

    return res.status(500).json({
      message: "Failed to add address",
      error: error.message
    });
  }
};


//add 19

// addressController.js

const setPrimaryAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.userId;

    // 1. Check whether this address belongs to the logged-in user
    const selectedAddress = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!selectedAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // 2. Make all this user's addresses non-primary
    await Address.updateMany(
      { user: userId },
      { $set: { isDefault: false } }
    );

    // 3. Make the selected address primary
    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        user: userId,
      },
      { $set: { isDefault: true } },
      { new: true }
    );

    return res.status(200).json({
      message: "Primary address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Set primary address error:", error);

    return res.status(500).json({
      message: "Failed to set primary address",
    });
  }
};


module.exports={fetchuserdetails,updateAddress,addAddress,setPrimaryAddress}