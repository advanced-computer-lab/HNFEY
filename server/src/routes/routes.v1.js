// const adminRoutes = require("../components/admin/routes");
const userRoutes = require("../components/user/routes");
const flightRoutes = require("../components/flight/routes");
const reservationRoutes = require("../components/reservation/routes");
const seatRoutes = require("../components/seat/routes");
const authRoutes = require("../components/auth/routes");
const paymentRoutes = require("../components/stripe/routes");

module.exports = (app, base) => {
  // app.get(`${base}/`, (req, res) => {
  //   res.send("ezzatXammar");
  // });
  app.use(`${base}/user`, userRoutes);
  app.use(`${base}/seat`, seatRoutes);

  // app.use(`${base}/admin`, adminRoutes);
  app.use(`${base}/auth`, authRoutes);
  app.use(`${base}/flight`, flightRoutes);
  app.use(`${base}/reservation`, reservationRoutes);
  app.use(`${base}/payment`, paymentRoutes);
};
