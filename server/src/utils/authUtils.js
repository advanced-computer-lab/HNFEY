const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (user) => jwt.sign({ ...user }, jwtSecret);

const hashPassword = async (plainPassword) =>
  await bcrypt.hash(plainPassword, 10);
const comparePassword = (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword);

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = req.headers && authHeader;
  const error = new Error();
  error.name = "Forbidden";
  if (token)
    jwt.verify(token, jwtSecret, async (err, user) => {
      if (err) {
        next(err);
      } else {
        const userFromDB = await User.findOne({
          email: user.email,
        });
        if (userFromDB) {
          req.user = user;
          next();
        } else {
          next(error);
        }
      }
    });
  else {
    next(error);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
