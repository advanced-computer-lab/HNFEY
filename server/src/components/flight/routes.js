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
router.put("/edit-flight",controller.updatePipeline,async (req,res)=>{
  res.status(200).json({
    message: "Flight updated successfully",
    flight: req.updatedFlight,
  })
})


module.exports = router;
