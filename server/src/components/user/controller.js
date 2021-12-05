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

const findUserOrAdmin = async (req, res, next) => {
  try {
    const user = req.query;
    const adminResults = await model.findAdmin(user);
    if (adminResults) {
      req.user = adminResults;
      req.typeOfUser = "admin";
      next();
    } else {
      const userResults = await model.findUser(user);
      if (userResults) {
        req.user = userResults;
        req.typeOfUser = "user";
        next();
      } else {
        const err = new Error("Cannot find User");
        next(err);
      }
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

const updateUser = async (req, res, next) => {
  try {
    const userID = req.body.user._id;
    const userUpdated = req.body.user;
    await model.updateUser(userID, req.body.user);
    if (userUpdated) {
      next();
    } else {
      const err = new Error("Cannot update user");
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

const findPipeline = [
  //verify Admin,
  findUserOrAdmin,
];

const updatePipeline = [
  //verify admin
  updateUser,
];

module.exports = {
  fetchAllPipeline,
  createPipeline,
  findPipeline,
  updatePipeline,
};
