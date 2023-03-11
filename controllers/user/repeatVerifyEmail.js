const { User } = require("../../models");
const { sendMail } = require("../../helpers");

const repeatVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  const { verificationToken } = user;

  if (!email) {
    return res.status(400).json({
      code: 400,
      message: "Missing required field email",
    });
  }

  if (user.verify) {
    return res.status(400).json({
      code: 400,
      message: "Verification has already been passed",
    });
  }

  const mail = {
    to: email,
    subject: "Submit email",
    html: `<a target="_blank" href="http://localhost:5000/api/users/verify/${verificationToken}">Submit email</a>`,
  };

  await sendMail(mail);

  res.json({ status: "Ok", code: 200, message: "Verification email sent" });
};

module.exports = repeatVerifyEmail;