const { User } = require("../../models");
const createError = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    Status: 200,
    ResponseBody: {
      message: "Verification successful",
    },
  });
};

module.exports = verifyEmail;