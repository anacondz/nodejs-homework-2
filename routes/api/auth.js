const express = require("express");
const router = express.Router();

const {
  validation,
  authorization,
  upload,
  emailValidation,
} = require("../../middlewares");const { userSchemas } = require("../../models");

const { auth: ctrl, user } = require("../../controllers");

router.post("/signup", validation(userSchemas.joiRegisterSchema), ctrl.signUp);

router.post("/login", validation(userSchemas.joiLoginSchema), ctrl.login);

router.get("/current", authorization, user.currentUser);

router.get("/logout", authorization, ctrl.logout);

router.patch("/subscriprtion", authorization, user.updateSubscription);

router.post("/verify", emailValidation, user.repeatVerifyEmail);

router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  user.updateAvatar
);
router.get("/verify/:verificationToken", user.verifyEmail);

module.exports = router;