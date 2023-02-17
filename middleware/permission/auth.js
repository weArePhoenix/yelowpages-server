const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ message: "Login Required.", isLogedin:false });

    try {
        req.user = jwt.verify(token, process.env.jwtSecretKey);
    } catch (ex) {
        return res
            .status(401)
            .json({ message: "Session Expired! Login Required...",isLogedin:false });
    }

    next();
};
