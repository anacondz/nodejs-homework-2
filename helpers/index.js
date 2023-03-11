const { handleErrors } = require("./schemaError");
const { sendMail } = require("./sendgrid");

module.exports = {
  handleErrors,
  sendMail
};