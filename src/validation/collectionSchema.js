const yup = require("yup");

module.exports = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  subject: yup.string().required(),
});
