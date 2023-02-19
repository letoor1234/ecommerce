const { Router } = require("express");
const { getLogin, getRegister } = require("../controllers/auth.controller");

const router = Router();

router.get("/login", getLogin);
router.get("/register", getRegister);

module.exports = router;
