const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/find-reservation", controller.findPipeline, async (req, res) => {
  res.status(200).json({
    message: "reservation fetched successfully",
    reservation: req.reservation,
  });
});

router.get("/:id", controller.fetchPipeline, async (req, res) => {
  res.status(200).json({
    message: "reservation fetched successfully",
    reservation: req.reservation,
  });
});
router.get("/", controller.fetchAllPipeline, async (req, res) => {
  res.status(200).json({
    message: "reservation fetched successfully",
    resrvations: req.reservations,
  });
});

router.post("/", controller.createPipeline, async (req, res) => {
  res.status(201).json({
    message: "reservation created successfully",
    reservation: req.reservation,
  });
});

router.delete("/:id", controller.deletePipeline, async (req, res) => {
  if (req.transaction) await req.transaction.commit();
  res.status(200).json({
    message: "Reservation canceled successfully",
  });
});

router.put("/edit-reservation", controller.updatePipeline, async (req, res) => {
  res.status(200).json({
    message: "Reservation updated successfully",
    reservation: req.updatedReservation,
  });
});

module.exports = router;
