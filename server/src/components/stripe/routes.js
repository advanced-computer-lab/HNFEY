const express = require("express");
const controller = require("./controller");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid");

router.post("/pay", async (req, res) => {
  const { product, token, email } = req.body;
  console.log(token);
  console.log(email);
  // const idempontencyKey = uuid.v4();

  return stripe.customers
    .create({
      email,
      source: token.id,
      email,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: product.price * 100,
        currency: "egp",
        customer: customer.id,
        receipt_email: email,
      });
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
