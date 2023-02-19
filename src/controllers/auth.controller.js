const getRegister = (req, res) => {
  return res.send("Estoy en el Registro");
};
const getLogin = (req, res) => {
  return res.send("Estoy en el inicio de sesion");
};

module.exports = {
  getLogin,
  getRegister,
};
