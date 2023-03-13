const { Router } = require("express");
const {
  getLogin,
  getRegister,
  registerUser,
} = require("../controllers/auth.controller");

const router = Router();

router.get("/login", getLogin);

router.get("/register", getRegister);
router.post("/register", registerUser);

module.exports = router;
