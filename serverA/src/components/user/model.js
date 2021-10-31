const User = require("../../../database/models/user");

const fetchAll = () => User.find({});

const createUser = async (user) => {
  return await User.create(user);
};

module.exports = {
  fetchAll,
  createUser,
};
