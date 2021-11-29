const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/", controller.fetchAllPipeline, async (req, res) => {
  res.status(200).json({
    message: "Users fetched successfully",
    users: req.users,
  });
});

router.post("/", controller.createPipeline, async (req, res) => {
  res.status(201).json({
    message: "User created successfully",
    user: req.user,
  });
});

router.get("/find-user", controller.findPipeline, async (req, res) => {
  res.status(200).json({
    message: "user available:",
    user: req.user,
  });
});

router.put("/edit-user", controller.updatePipeline, async (req, res) => {
  res.status(200).json({
    message: "User information updated successfully",
    user: req.updatedUser,
  });
});

module.exports = router;
