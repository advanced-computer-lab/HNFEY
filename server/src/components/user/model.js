const User = require("../../../database/models/user");

const fetchAll = () => User.find({});

const createUser = async (user) => {
  return await User.create(user);
};

const fetch = async (_id) => {
  return await User.find({ _id });
};

const update = async (_id, updatedUser) => {
  return await User.findByIdAndUpdate(_id, updatedUser);
};

const findUser = async (user) => {
  return await User.findOne(user);
};

const updateUser = async (_id, updatedUser) => {
  return await User.findByIdAndUpdate(_id, updatedUser);
};

module.exports = {
  fetchAll,
  fetch,
  updateUser,
  createUser,
  findUser,
};
