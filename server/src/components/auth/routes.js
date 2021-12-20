const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.post("/register", controller.registerPipeline, async (req, res) => {
  res.status(201).json({
    message: "Registered successfully!",
    user: req.user,
  });
});

router.post(
  "/register/admin",
  controller.registerAdminPipeline,
  async (req, res) => {
    res.status(201).json({
      message: "Registered successfully!",
      admin: req.admin,
    });
  }
);

router.post(
  "/login",
  controller.loginUserAndAdminPipeline,
  async (req, res) => {
    res.status(200).json({
      message: "Logged in successfully!",
      user: req.user,
      typeOfUser: req.typeOfUser,
      token: req.token,
    });
  }
);

// router.post("/login/admin", controller.loginAdminPipeline, async (req, res) => {
//   res.status(200).json({
//     message: "Logged in successfully!",
//     admin: req.admin,
//     token: req.token,
//   });
// });

router.post(
  "/password/forget",
  controller.forgetPasswordPipeline,
  async (req, res) => {
    res.status(200).json({
      message: "Email with instructions is sent successfully!",
    });
  }
);

router.post(
  "/password/reset",
  controller.resetPasswordPipeline,
  async (req, res) => {
    res.status(200).json({
      message: "Password updated successfully!",
    });
  }
);

router.patch(
  "/password",
  controller.updatePasswordPipeline,
  async (req, res) => {
    res.status(200).json({
      message: "Password updated successfuly!",
    });
  }
);

module.exports = router;
