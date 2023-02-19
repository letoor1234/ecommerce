require("dotenv").config();

const express = require("express");

const app = express();

// Agregamos rutas
/* 
Ejemplo:
  app.get("/cart", (req, res) => res.send("Estoy en el carrito"))
*/
const authRoutes = require("./routes/auth.route");
const homeRoutes = require("./routes/home.route");
const productDetailRoutes = require("./routes/productDetail.route");
const cartRoutes = require("./routes/cart.route");

app.use("/auth", authRoutes);
app.use("/", homeRoutes);
app.use("/product-detail", productDetailRoutes);
app.use("/cart", cartRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Server Error on init");
    console.log(err);
    return;
  }
  console.log("Listening on port " + process.env.PORT);
  return;
});
