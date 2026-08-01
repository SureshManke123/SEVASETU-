const jwt = require("jsonwebtoken");

// ================= PROTECT MIDDLEWARE =================

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Token Missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user data in request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

// ================= ROLE AUTHORIZATION =================

const authorize = (...roles) => {
  return (req, res, next) => {
    // Check User Role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied. You are not authorized.",
      });
    }

    next();
  };
};

// Export Middlewares
module.exports = {
  protect,
  authorize,
};