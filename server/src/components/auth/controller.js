const model = require("./model");
const authUtils = require("../../utils/authUtils");
const email = require("../../utils/email");
const bcrypt = require("bcrypt");

//insert payment module//

const createUser = async (req, res, next) => {
  try {
    req.body.user.email = req.body.user.email.toLowerCase();
    const user = await model.createUser(req.body.user);
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const findUserAccount = async (req, res, next) => {
  try {
    if (req.typeOfUser === "admin") {
      next();
    }
    const user = await model.fetchUserByUsername(req.body.user.username);
    req.user = user.toJSON();
    next();
  } catch (err) {
    next(err);
  }
};

const findAdminAccount = async (req, res, next) => {
  try {
    const admin = await model.fetchAdminByUsername(req.body.user.username);
    if (admin) {
      req.user = admin.toJSON();
    }
    next();
  } catch (err) {
    next(err);
  }
};

const authenticateUser = async (req, res, next) => {
  if (req.typeOfUser === "admin") {
    next();
  } else {
    const passIsValid = await authUtils.comparePassword(
      req.body.user.password,
      req.user.password
    );
    if (passIsValid) {
      req.typeOfUser = "user";
      next();
    } else {
      const err = new Error("Invalid email or password");
      next(err);
    }
  }
};

const authenticateAdmin = async (req, res, next) => {
  if (req.user) {
    const passIsValid = await authUtils.comparePassword(
      req.body.user.password,
      req.user.password
    );
    if (passIsValid) {
      req.typeOfUser = "admin";
      next();
    } else {
      const err = new Error("Invalid email or password");
      err.code = 400;
      err.name = "Unauthenticated";
      next(err);
    }
  } else {
    next();
  }
};

const generateJWT = async (req, res, next) => {
  if (req.typeOfUser === "admin") {
    next();
  } else {
    delete req.user.password;
    const token = authUtils.generateToken(req.user);
    req.token = token;
    next();
  }
};

const generateAdminJWT = async (req, res, next) => {
  if (req.typeOfUser !== "admin") next();
  else {
    delete req.user.password;
    const token = authUtils.generateToken(req.user);
    req.token = token;
    next();
  }
};

const sendPasswordResetMail = (req, res, next) => {
  const user = req.body.user;
  const url =
    process.env.APP_URL +
    process.env.APP_VERSION +
    "/auth/password/reset?email=" +
    user.email +
    "&code=" +
    req.code;

  try {
    const user = req.user;
    var mailOptions = {
      to: user.email,
      subject: "Reset your nutilane password now",
      text:
        " We received a request to reset the password associated with this email address." +
        `\nIf you made this request, please click ${url} here to reset your password.` +
        "If you did not request to have your password reset you can safely ignore this email. Be assured your account is safe.",
      context: {
        name: user.name,
        url:
          process.env.APP_URL +
          process.env.APP_VERSION +
          "/auth/password/reset?email=" +
          user.email +
          "&code=" +
          req.code,
      },
    };
    req.mailOptions = mailOptions;
    email.sendMail(req, res, next);
    next();
  } catch (err) {
    next(err);
  }
};

const verifyOldPassword = async (req, res, next) => {
  try {
    const user = await model.fetchUserByEmail(req.user.email);
    const passwordIsValid = await authUtils.comparePassword(
      req.body.old_password,
      user.password
    );
    if (passwordIsValid) next();
    else {
      const error = new Error("Invalid password");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    console.log("hhhh");
    const hashedPassword = await authUtils.hashPassword(req.body.password);
    const updatedUser = { password: hashedPassword };
    await model.updateUser(req.user && req.user._id, updatedUser);
    next();
  } catch (err) {
    console.log("errrrrr");
    next(err);
  }
};

const checkEmailExists = async (req, res, next) => {
  try {
    const user = await model.fetchUserByEmail(req.body.user.email);
    if (!user) next();
    else {
      const err = new Error("Email already exists");
      err.name = "Forbidden";
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const createAdmin = async (req, res, next) => {
  try {
    const admin = await model.createAdmin(req.body.admin);
    delete admin.password;
    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
};

const registerPipeline = [checkEmailExists, createUser];

const registerAdminPipeline = [createAdmin];

const loginPipeline = [findUserAccount, authenticateUser, generateJWT];

const loginUserAndAdminPipeline = [
  findAdminAccount,
  authenticateAdmin,
  generateAdminJWT,
  findUserAccount,
  authenticateUser,
  generateJWT,
];

const loginAdminPipeline = [
  findAdminAccount,
  authenticateAdmin,
  generateAdminJWT,
];

const forgetPasswordPipeline = [findUserAccount, sendPasswordResetMail];

const resetPasswordPipeline = [resetPassword];

const updatePasswordPipeline = [
  authUtils.verifyToken,
  verifyOldPassword,
  resetPassword,
];

module.exports = {
  registerPipeline,
  loginPipeline,
  loginAdminPipeline,
  loginUserAndAdminPipeline,
  registerAdminPipeline,
  forgetPasswordPipeline,
  resetPasswordPipeline,
  updatePasswordPipeline,
};
