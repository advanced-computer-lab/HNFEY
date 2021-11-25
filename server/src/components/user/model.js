const User = require("../../../database/models/user");

const fetchAll = () => User.find({});

const createUser = async (user) => {
  return await User.create(user);
};

const findFlight = async (flight) => {
  return await Flight.find(flight);
};

module.exports = {
  fetchAll,
  createUser,
  findFlight,
};
