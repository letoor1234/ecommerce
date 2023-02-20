const path = require("path");
const fs = require("fs");

const getProductDetail = (req, res) => {
  const { id } = req.params;

  const data = fs.readFileSync(
    path.join(__dirname, "../database/products.json"),
    "utf-8"
  );

  const products = JSON.parse(data);

  const product = products.find((product) => product.id == id);

  if (!product) return res.send("Producto no encontrado");

  return res.render("pages/product-detail.ejs", { product });
};

module.exports = {
  getProductDetail,
};
