const router = require("express").Router();
const {sendEmailForAccountVerification,verifyEmailForAccountVerification} = require("../controller/verifyEmailAtTheTimeOfAccountCreate")

router.post("/",sendEmailForAccountVerification);
router.post("/:token",verifyEmailForAccountVerification);

module.exports = router;