const { Router } = require("express");
const { getProductDetail } = require("../controllers/productDetail.controller");

const router = Router();

router.get("/", getProductDetail);

module.exports = router;
