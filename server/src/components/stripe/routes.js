const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.post("/pay", controller.payPipeline, async (req, res) => {
  res.status(200).json({
    message: "Payment Successful",
    session: req.session,
  });
});

module.exports = router;
