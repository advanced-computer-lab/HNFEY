const model = require("./model");

const fetchAll = async (req, res, next) => {
  try {
    const users = await model.fetchAll();
    if (users) {
      req.users = users;
      next();
    } else {
      const err = new Error("Users not found");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = req.body.user;
    const userCreated = await model.createUser(user);
    if (userCreated) {
      req.user = userCreated;
      next();
    } else {
      const err = new Error("Cannot create user");
      next(err);
    }
  } catch (err) {
    next(err);
  }
};


const fetchAllPipeline = [
  //verify Admin,
  fetchAll,
];

const createPipeline = [
  //verify Admin,
  createUser,
];

module.exports = {
  fetchAllPipeline,
  createPipeline,
};
