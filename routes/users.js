const express = require("express");
const router = express.Router();
const admin = require("../middleware/permission/admin");
const auth = require("../middleware/permission/auth");
const { validator } = require("../models/user");
const validateBody = require("../middleware/common/validateBody");
const {
    getAllUsers,
    getUser,
    deleteUser,
    postUser,
    updateUser,
} = require("../controller/users");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", [validateBody(validator)],postUser);
router.put("/:id", [auth, validateBody(validator)], updateUser);
router.delete("/:id", [auth, admin], deleteUser);

module.exports = router;
