const express = require("express");
const router = express.Router();
const auth = require("../middleware/permission/auth");
const reviewOwner = require("../middleware/permission/reviewOwner");
const { validator } = require("../models/review.js");
const validateBody = require("../middleware/common/validateBody");

const {
    getAllReviews,
    getReview,
    deleteReview,
    postReview,
    updateReview,
} = require("../controller/reviews");

router.get("/", getAllReviews);
router.get("/:id", getReview);
router.post("/", [auth, validateBody(validator)], postReview);
router.put("/:id", [auth, reviewOwner, validateBody(validator)], updateReview);
router.delete("/:id", [auth, reviewOwner], deleteReview);

module.exports = router;
