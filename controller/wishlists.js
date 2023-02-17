const Wishlist = require("../models/wishlist");

const getAllWishlists = async (req, res) => {
    res.send(await Wishlist.find());
};

const getWishlist = async (req, res) => {
    const wishlist = await Wishlist.findOne({ _id: req.params.id });
    res.send(wishlist);
};

const deleteWishlist = async (req, res) => {
    const wishlist = await Wishlist.findById(req.params.id);

    wishlist.books.splice(wishlist.books.indexOf(req.body.book), 1);

    await wishlist.save();

    res.send(wishlist);
};

const updateWishlist = async (req, res) => {
    const wishlist = await Wishlist.findById(req.params.id);

    if (!wishlist) return res.status(404).send("Wishlist Not Found!");

    if (wishlist.books.includes(req.body.book))
        return res
            .status(400)
            .json({ message: "Book Already added to Wishlist" });

    wishlist.books.push(req.body.book);

    res.send(await wishlist.save());
};

module.exports = {
    getAllWishlists,
    getWishlist,
    deleteWishlist,
    updateWishlist,
};
