const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/", controller.fetchAllPipeline, async (req, res) => {
  res.status(200).json({
    message: "reservation fetched successfully",
    resrvations: req.reservations,
  });
});
router.post("/create-reservation", controller.createPipeline, async (req, res) => {
  res.status(201).json({
    message: "reservation created successfully",
    reservation: req.reservation,
  });
});
router.get("/find-reservation", controller.findPipeline, async (req, res) => {
  res.status(200).json({
    message: "reservation fetched successfully",
    reservation: req.reservation,
  });
});

module.exports = router;
