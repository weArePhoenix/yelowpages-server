const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!req.user.isAdmin)
        return res.status(403).json({ message: "Access Denied!" });

    next();
};
