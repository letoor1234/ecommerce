const getHome = (req, res) => {
  return res.send("Estoy en el Home");
};

module.exports = {
  getHome,
};
