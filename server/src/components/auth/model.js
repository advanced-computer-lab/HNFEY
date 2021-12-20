const User = require("../../../database/models/user");
const Admin = require("../../../database/models/admin");
const authUtils = require("../../utils/authUtils");

const createUser = async (user) => {
  user.password = await authUtils.hashPassword(user.password);
  return await User.create(user);
};

const createAdmin = async (admin) => {
  admin.password = await authUtils.hashPassword(admin.password);
  return Admin.create(admin);
};

const fetchUserByEmail = (email) => {
  return User.findOne({
    email,
  });
};

const fetchUserByUsername = (username) => {
  return User.findOne({
    username,
  });
};

const fetchAdminByEmail = (email) => {
  return Admin.findOne({
    email,
  });
};

const fetchAdminByUsername = (username) => {
  return Admin.findOne({
    username,
  });
};

const updateUser = (updatedUser, email) => {
  return User.updateOne(updatedUser, { email });
};

module.exports = {
  createUser,
  createAdmin,
  fetchUserByEmail,
  fetchUserByUsername,
  fetchAdminByEmail,
  fetchAdminByUsername,
  updateUser,
};
