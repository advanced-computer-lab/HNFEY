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

router.post("/find-flight", controller.findFlightsPipeline, async (req, res) => {
  res.status(200).json({
    message: "Flights available:",
    flights: req.flights,
  });
});

module.exports = router;
