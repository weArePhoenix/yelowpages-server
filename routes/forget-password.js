const router = require("express").Router();
const {generateTokenAndSend, verifyAndResetPassword} = require("../controller/forget-Password")

router.post("/",generateTokenAndSend);
router.post("/reset/:token",verifyAndResetPassword);

module.exports = router;