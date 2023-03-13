const fs = require("fs");
const path = require("path");

const getSessionStarted = (req, res, next) => {
  const { user } = req.session;

  console.log("session middleware");
};

module.exports = {
  getSessionStarted,
};
