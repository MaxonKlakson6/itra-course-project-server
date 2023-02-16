const yup = require("yup");

module.exports = yup.object({
  title: yup.string().required(),
  tags: yup.array().of(yup.string().required()).min(1),
});
