// const adminRoutes = require("../components/admin/routes");
const userRoutes = require("../components/user/routes");
const flightRoutes = require("../components/flight/routes");

module.exports = (app, base) => {
  app.get(`${base}/`, (req, res) => {
    console.log("hi");
    res.send("ezzatXammar");
  });
  app.use(`${base}/user`, userRoutes);
  // app.use(`${base}/admin`, adminRoutes);
  app.use(`${base}/flight`, flightRoutes);
};
