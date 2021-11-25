const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/", controller.findFlightsPipeline, async (req, res) => {
  res.status(200).json({
    message: "Flight fetched successfully",
    flights: req.flights,
  });
});

module.exports = router;
