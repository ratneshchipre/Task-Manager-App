const { getUser } = require("../service/auth.service");

const checkForAuthentication = () => {
  return (req, res, next) => {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login first.",
      });
    }

    try {
      const token = tokenCookie;
      const user = getUser(token);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token. Please login again.",
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Please login again.",
      });
    }
  };
};

module.exports = checkForAuthentication;
