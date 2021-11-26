const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/list-flights", controller.findPipeline, async (req, res) => {
  res.status(200).json({
    message: "Flight fetched successfully",
    flights: req.flights,
  });
});

router.get("/:id", controller.fetchPipeline, async (req, res) => {
  res.status(200).json({
    message: "Flight fetched successfully",
    flight: req.flight,
  });
});

router.get("/", controller.findUserFlightsPipeline, async (req, res) => {
  res.status(200).json({
    message: "Flight fetched successfully",
    flights: req.flights,
  });
});

router.post("/create-flight", controller.createPipeline, async (req, res) => {
  res.status(201).json({
    message: "Flight created successfully",
    flight: req.flight,
  });
});

router.put("/edit-flight", controller.updatePipeline, async (req, res) => {
  res.status(200).json({
    message: "Flight updated successfully",
    flight: req.updatedFlight,
  });
});

router.post("/find-flight", controller.findPipeline, async (req, res) => {
  res.status(200).json({
    message: "Flights available:",
    flights: req.flights,
  });
});

router.delete("/:id", controller.deletePipeline, async (req, res) => {
  if (req.transaction) await req.transaction.commit();
  res.status(200).json({
    message: "Flight deleted successfully",
  });
});

module.exports = router;
