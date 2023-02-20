const { Router } = require("express");
const { getProductDetail } = require("../controllers/productDetail.controller");

const router = Router();

router.get("/:id", getProductDetail);

module.exports = router;
