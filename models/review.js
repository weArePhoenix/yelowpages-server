const mongoose = require("mongoose");
const yup = require("yup");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 1,
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500,
    },
    publishedTime: {
        type: Date,
        required: true,
    },
});

const Review = mongoose.model("Review", reviewSchema);

const validator = async review => {
    const schema = yup.object({
        content: yup.string().required().min(5).max(500),
    });

    return schema.validate(review).catch(err => err);
};

module.exports = { Review, validator };
