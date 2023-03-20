const fs = require("fs");
const path = require("path");

const getSessionStarted = (req, res, next) => {
  const { user } = req.session;

  if (user?.id) {
    const file = fs.readFileSync(
      path.join(__dirname, "../database/users.json"),
      "utf-8"
    );

    const data = JSON.parse(file);

    const userFinded = data.find((thisUser) => thisUser.id === user.id);

    res.customRender = (path, data) => {
      return res.render(path, {
        ...data,
        user: {
          username: userFinded.username,
          email: userFinded.email,
        },
      });
    };
  } else {
    res.customRender = (path, data) =>
      res.render(path, { ...data, user: null });
  }

  next();
};

const validateRegisterData = (req, res, next) => {
  const user = req.body;

  console.log("Valdiate register");
  next();
};

module.exports = {
  getSessionStarted,
  validateRegisterData,
};
