const express = require("express");
const controller = require("./controller");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid");

router.post("/pay", async (req, res) => {
  const { product, token, email } = req.body;
  // const idempontencyKey = uuid.v4();

  return stripe.customers
    .create({
      email,
      source: token.id,
      email,
    })
    .then((customer) => {
      stripe.charges
        .create({
          amount: product.price * 100,
          currency: "egp",
          customer: customer.id,
          receipt_email: email,
        })
        .then((result) => {
          console.log(result);
          res.status(200).json({
            charge: result,
          });
        });
    })
    .catch((err) => console.log(err));
});

router.post("/refund", controller.refundPipeline, async (req, res) => {
  res.status(201).json({
    message: "Refunded successfully",
    refund: req.refund,
  });
});

module.exports = router;
