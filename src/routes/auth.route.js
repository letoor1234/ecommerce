const { Router } = require("express");
const {
  getLogin,
  getRegister,
  registerUser,
  loginUser,
  signoutUser,
} = require("../controllers/auth.controller");

const router = Router();

router.get("/login", getLogin);
router.post("/login", loginUser);

router.get("/register", getRegister);
router.post("/register", registerUser);

router.get("/signout", signoutUser);

module.exports = router;
