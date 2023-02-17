const checkCollection = require("../helpers/checkCollection");

module.exports = async function (req, res, next) {
  try {
    const collectionId = req.params.id;

    await checkCollection(collectionId);

    next();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};
