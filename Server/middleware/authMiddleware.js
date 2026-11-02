
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  let token;

  if (req.headers.authorization ) {
    token = req.headers.authorization;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not Authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No Token" });
  }
};

module.exports = checkAuth;




//checkAuth എന്ന middleware ഉപയോഗിക്കുന്നത് JWT token verify ചെയ്ത് authenticated users-ന് മാത്രം protected API access അനുവദിക്കാനാണ്.
  // headers: {
   //     Authorization: `Bearer ${token}`  front endil ninnu ayakunna token   ith middilware userId tokenile userid inode match aakanam ennal matrame protected apiyileek pokooo