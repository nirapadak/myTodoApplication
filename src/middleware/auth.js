const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


exports.loginRequire =(req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY);
    // req .user  why aging and aging error here----------------
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(404).json({
      "success": false,
      error: `${error}`
    });
  }
}

exports.isAdmin = async(req, res, next) => {
  try {
  
 
    const user = await userModel.findById(req.user._id)

    if (user.role !== "1") {
      res.status(404).json({
        "success": false,
        error: "authorization error",
        message: "You are not Admin"
      })
    } else {
      next();
    }
  } catch (error) {
    res.json({
      "success": true,
      error: error.message
    });
  }
}