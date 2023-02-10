const jwt = require("jsonwebtoken");

module.exports = function (token) {
  const splittedToken = token.split(" ")[1];
  const decodedToken = jwt.verify(splittedToken, process.env.JWT_SECRET);

  return decodedToken.id;
};
