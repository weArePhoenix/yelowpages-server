const { Review } = require("../../models/review");

module.exports = async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review Not Found!" });

    if (req.user.isAdmin || req.user._id === review.user.toHexString()) next();
    else
        return res
            .status(403)
            .json({ message: "You don't have any authority for this action!" });
};
