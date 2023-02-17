const mongoose = require("mongoose");
const yup = require("yup");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
    },
    author: {
        type: String,
        required: true,
    },
    publishYear: {
        type: Number,
        required: true,
    },
    bookDetails: {
        type: String,
        require: true,
        minlength: 15,
    },
    bookCondition: {
        type: String,
        required: true,
        lowercase: true,
        enum: [
            "poor",
            "fine/like new",
            "near fine",
            "fair",
            "good",
            "very good",
        ],
    },
    donatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    donatedOn: {
        type: Date,
        require: true,
    },
    previewImgSrc: {
        type: String,
        required: true,
        default: "https://pngimg.com/d/book_PNG2111.png",
    },
});

const Book = mongoose.model("Book", bookSchema);

const validator = async book => {
    const schema = yup.object({
        title: yup.string().required().min(1).max(255),
        author: yup.string().required().min(2).max(255),
        publishYear: yup.number().required(),
        bookDetails: yup.string().required().min(15),
        bookCondition: yup
            .string()
            .required()
            .lowercase()
            .oneOf([
                "poor",
                "fine/like new",
                "near fine",
                "fair",
                "good",
                "very good",
            ]),
    });

    return schema.validate(book).catch(err => err);
};

module.exports = { Book, validator };
