const path = require("path");
const fs = require("fs");

const getHome = (req, res) => {
  const data = fs.readFileSync(
    path.join(__dirname, "../database/products.json"),
    "utf-8"
  );

  const products = JSON.parse(data);

  return res.customRender("pages/home.ejs", { products });
};

module.exports = {
  getHome,
};
