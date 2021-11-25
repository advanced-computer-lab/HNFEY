// const adminRoutes = require("../components/admin/routes");
const userRoutes = require("../components/user/routes");
const flightRoutes = require("../components/flight/routes");
const guestRoutes = require("../components/guest/routes");

module.exports = (app, base) => {
  // app.get(`${base}/`, (req, res) => {
  //   console.log("hi");
  //   res.send("ezzatXammar");
  // });
  app.use(`${base}/`, guestRoutes);
  app.use(`${base}/user`, userRoutes);
  // app.use(`${base}/admin`, adminRoutes);
  app.use(`${base}/flight`, flightRoutes);
};
