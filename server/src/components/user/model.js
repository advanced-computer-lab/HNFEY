const User = require("../../../database/models/user");
const Admin = require("../../../database/models/admin");

const fetchAll = () => User.find({});

const createUser = async (user) => {
  return await User.create(user);
};

const fetchById = async (_id) => {
  return await User.findById(_id);
};

const findUser = async (user) => {
  return await User.findOne(user);
};

const findAdmin = async (user) => {
  return await Admin.findOne(user);
};

const updateUser = async (_id, updatedUser) => {
  return await User.findByIdAndUpdate(_id, updatedUser);
};

module.exports = {
  fetchAll,
  fetchById,
  updateUser,
  findAdmin,
  createUser,
  findUser,
};
