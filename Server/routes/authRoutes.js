const express = require("express");
const checkAuth = require("../middleware/authMiddleware");
const { register, home, login,fetchuserdetails,addnewdata,fetchcustomer,changeisactive} = require("../controllers/authController");
const router = express.Router();

router.post("/register",register);

router.post("/login", login);

router.get("/home", checkAuth, home);

router.get("/userdetails",checkAuth,fetchuserdetails)   //there are many users so we need to find the specific user

router.put("/newdata",checkAuth,addnewdata)

router.get("/users",checkAuth,fetchcustomer)

router.put("/isactive/:id",checkAuth,changeisactive)

module.exports = router;