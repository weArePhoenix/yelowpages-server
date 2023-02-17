const { Book } = require("../../models/book");

module.exports = async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book Not Found!" });

    if (req.user.isAdmin || req.user._id === book.donatedBy.toHexString())
        next();
    else
        return res
            .status(403)
            .json({ message: "You don't have any authority for this action!" });
};
