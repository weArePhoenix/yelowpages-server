const express = require("express");
const router = express.Router();
const bookUpload = require("../middleware/book/bookUpload");
const auth = require("../middleware/permission/auth");
const bookOwner = require("../middleware/permission/bookOwner");
const { validator } = require("../models/book");
const validateBody = require("../middleware/common/validateBody");

const {
    getAllBooks,
    getBook,
    deleteBook,
    postBook,
    updateBook,
} = require("../controller/books");

router.get("/", getAllBooks);
router.get("/:id", getBook);

// Using Default Book Preview Image
// router.post("/", [auth, validateBody(validator)], postBook);

// For Custom Book Preview Image Upload
router.post("/", [auth, bookUpload, validateBody(validator)], postBook);

router.put("/:id", [auth, bookOwner, validateBody(validator)], updateBook);
router.delete("/:id", [auth, bookOwner], deleteBook);

module.exports = router;
