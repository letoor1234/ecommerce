const { Router } = require("express");
const {
  getLogin,
  getRegister,
  registerUser,
  loginUser,
  signoutUser,
} = require("../controllers/auth.controller");
const { validateRegisterData } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/login", getLogin);
router.post("/login", loginUser);

router.get("/register", getRegister);
router.post("/register", validateRegisterData, registerUser);

router.get("/signout", signoutUser);

module.exports = router;
