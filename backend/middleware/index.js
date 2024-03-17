const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
  if (!req.cookies || !req.cookies["token"]) {
    return next(new AppError("Unauthorized", 401));
  }
  const cookie = req.cookies["token"];

  // Verify JWT token to stay logged in
  const claims = jwt.verify(cookie, process.env.JWT_SECRET_KEY);
  if (!claims) {
    return next(new AppError("Unauthorized", 401));
  }

  next();
};
