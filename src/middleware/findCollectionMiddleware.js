const checkCollection = require("../helpers/checkCollection");

module.exports = async function (req, res, next) {
  try {
    const id = req.params.id;

    await checkCollection(id);

    next();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
