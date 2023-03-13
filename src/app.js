require("dotenv").config();
const path = require("path");
const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();

// Configuramos express
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(cookieParser());

// Middleware
const { getSessionStarted } = require("./middlewares/auth.middleware");
app.use(getSessionStarted);

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
