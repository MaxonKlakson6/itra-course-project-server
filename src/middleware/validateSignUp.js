const signUpSchema = require("../validation/signUpSchema");

module.exports = function (req, res, next) {
  try {
    const { body } = req;
    signUpSchema.validateSync(body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
