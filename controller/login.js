const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res
            .status(400)
            .json({ message: "Username or Password not provided!" });

    const user = await User.findOne({ email: username });
    if (!user) return res.status(400).json({ message: "Invalid Username." });

    if (!user.isVerified) return res.status(400).json({ message: "Please Verify your account first..." });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect Password!" });

    const token = await user.generateAuthToken();

    res.status(200)
        .setHeader("auth-token", token)
        .json({ message: `Welcome to Yellow Pages ${user.name} 😎`, token });
};

module.exports = login;
