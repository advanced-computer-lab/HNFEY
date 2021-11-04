const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/list-flights", controller.fetchAllPipeline, async (req, res) => {
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

router.post("/find-flight", controller.findPipeline, async (req, res) => {
  res.status(201).json({
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
