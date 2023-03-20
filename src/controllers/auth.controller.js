const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const getRegister = (req, res) => {
  return res.customRender("pages/register.ejs");
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

  return res.redirect("/");
};

const getLogin = (req, res) => {
  return res.customRender("pages/login.ejs");
};

const loginUser = async (req, res) => {
  let user = req.body;
  if (!user.username) return res.send("Falta el nombre de usuario");
  if (!user.password) return res.send("Falta la contraseña");

  const file = fs.readFileSync(
    path.join(__dirname, "../database/users.json"),
    "utf-8"
  );

  const data = JSON.parse(file);

  const userFinded = data.find(
    (thisUser) => thisUser.username === user.username
  );

  if (!userFinded) {
    return res.send("Éste usuario no existe en nuestra base de datos");
  }

  const passwordMatches = bcrypt.compareSync(
    user.password,
    userFinded.password
  );

  if (!passwordMatches) {
    return res.send("La contraseña no coincide con nuestra base de datos");
  }

  req.session.user = { id: userFinded.id };
  req.session.save();

  return res.redirect("/");
};

const signoutUser = (req, res) => {
  req.session.destroy();

  return res.json({ ok: true });
};

module.exports = {
  getLogin,
  loginUser,
  getRegister,
  registerUser,
  signoutUser,
};
