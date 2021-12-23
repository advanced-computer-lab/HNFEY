const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const pay = async (req, res, next) => {
  try {
    const { totalPrice, email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "EGP",
            unit_amount: totalPrice * 100,
            product_data: {
              name: email,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/sign-up",
    });
    if (session) {
      req.session = session.id;
      next();
    } else {
      const error = new Error("Cannot complete transaction");
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

// const stripeCheckout = async (req, res, next) => {
//   try {
//     if (req.session) {
//       stripe = await loadStripe(stripePublicKey);
//       const checkout = await stripe.redirectToCheckout({
//         sessionId: req.session,
//       });
//       if (checkout) {
//         req.checkout = checkout;
//         next();
//       } else {
//         const error = new Error();
//         next(error);
//       }
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// const checkError = async (req, res, next) => {
//   try {
//     if (req.checkout.error) {
//       alert(req.checkError.error);
//       next(req.checkout.error);
//     } else {
//       next();
//     }
//   } catch (err) {
//     next(err);
//   }
// };

const payPipeline = [pay];

module.exports = {
  payPipeline,
};
