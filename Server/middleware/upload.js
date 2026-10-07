const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {    
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

module.exports = multer({ storage });
 
//multer used to store image
//user add chyyunna ooroo imagum  store to uploads
//uploads store chyyunna image id store to db
