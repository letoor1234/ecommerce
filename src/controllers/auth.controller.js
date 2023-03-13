const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const getRegister = (req, res) => {
  return res.render("pages/register.ejs");
};
const registerUser = async (req, res) => {
  let user = req.body;
  if (!user) return res.send("Falta la información de usuario");

  const salt = await bcrypt.genSaltSync(6);
  user.password = await bcrypt.hashSync(user.password, salt);

  const file = fs.readFileSync(
    path.join(__dirname, "../database/users.json"),
    "utf-8"
  );

  const data = JSON.parse(file);

  const id = crypto.randomBytes(20).toString("hex");

  fs.writeFileSync(
    path.join(__dirname, "../database/users.json"),
    JSON.stringify([...data, { ...user, id }], null, 2)
  );

  req.session.user = { id };
  req.session.save();

  return res.send("Usuario creado!");
};

const getLogin = (req, res) => {
  return res.send("Estoy en el inicio de sesion");
};

module.exports = {
  getLogin,
  getRegister,
  registerUser,
};
