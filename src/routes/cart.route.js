const { Router } = require("express");
const { getCart } = require("../controllers/cart.controller");

const router = Router();

router.get("/", getCart);

module.exports = router;
