/**
 * Middleware to check if the user has the required role.
 * @param {...string} allowedRoles - Roles permitted to access the route (e.g., 'Admin', 'Analyst')
 */

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });   
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  };
};

export default  authorizeRoles ;
