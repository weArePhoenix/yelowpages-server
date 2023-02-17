const express = require("express");
const router = express.Router();
const auth = require("../middleware/permission/auth");

const {
    getAllWishlists,
    getWishlist,
    updateWishlist,
    deleteWishlist,
} = require("../controller/wishlists");

router.get("/", getAllWishlists);
router.get("/:id", getWishlist);
router.put("/:id", updateWishlist);
router.delete("/:id", deleteWishlist);

module.exports = router;
