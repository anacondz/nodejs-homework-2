const { User } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const uniqid = require("uniqid");
const { sendMail } = require("../../helpers");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(
        409,
        `User with this email:${email} already registered`
      );
    }

    const avatarURL = gravatar.url(email);
    const saltPassword = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, saltPassword);
    const verificationToken = uniqid();
    
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
      verificationToken
    });
    const { subscription } = newUser;

    const mail = {
      to: email,
      subject: "Confirm your email",
      html: `<a target="_blank" href="http://localhost:5000/api/users/verify/${verificationToken}">Click to confirm your email</a>`,
    };

    //  send a mail
    await sendMail(mail);

    res.status(201).json({
      status: "Created",
      code: 201,
      ResponseBody: {
        user: {
          email,
          subscription,
          avatarURL,
          verificationToken
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;