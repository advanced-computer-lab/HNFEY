const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/list-seats", controller.findPipeline, async (req, res) => {
  res.status(200).json({
    message: "Seat fetched successfully",
    seats: req.seats,
  });
});

router.get("/", controller.findUserSeatsPipeline, async (req, res) => {
  res.status(200).json({
    message: "Seat fetched successfully",
    seats: req.seats,
  });
});

router.get("/:id", controller.fetchPipeline, async (req, res) => {
  res.status(200).json({
    message: "Seat fetched successfully",
    seat: req.seat,
  });
});

router.post("/", controller.createPipeline, async (req, res) => {
  res.status(201).json({
    message: "Seat created successfully",
    seat: req.seat,
  });
});

router.post("/bulk-create", controller.createBulkPipeline, async (req, res) => {
  res.status(201).json({
    message: "Seat created successfully",
    seats: req.seats,
  });
});

router.put("/edit-seat", controller.updatePipeline, async (req, res) => {
  res.status(200).json({
    message: "Seat updated successfully",
    seat: req.updatedSeat,
  });
});

router.delete("/:id", controller.deletePipeline, async (req, res) => {
  if (req.transaction) await req.transaction.commit();
  res.status(200).json({
    message: "Seat deleted successfully",
  });
});

module.exports = router;
