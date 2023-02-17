const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const yup = require("yup");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
    },
    gender: {
        type: String,
        requied: true,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
    },
    profilePicSrc: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const payload = { _id: user._id, isAdmin: user.isAdmin };
    return jwt.sign(payload, process.env.jwtSecretKey, {
        expiresIn: process.env.tokenValidity,
    });
};

const User = mongoose.model("User", userSchema);

const validator = user => {
    const userBody = yup.object({
        name: yup.string().required().min(3).max(20),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(255),
        address: yup.string().required().min(5),
        gender: yup.string(),
        phone: yup.number().test(val => val.toString().length === 10),
    });

    return userBody.validate(user).catch(err => err);
};

module.exports = { User, validator };

// Male DP : "https://www.shareicon.net/data/512x512/2016/09/15/829466_man_512x512.png"

// Female DP : "https://img.favpng.com/5/1/21/computer-icons-user-profile-avatar-female-png-favpng-cqykKc0Hpkh65ueWt6Nh2KFvS.jpg"
