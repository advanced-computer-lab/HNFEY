const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const routesV1 = require("./routes/routes.v1");
const app = express();

const PORT = process.env.PORT || 8000;

const MongoURI =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@hnfey.yudps.mongodb.net/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";

// configurations
// Mongo DB
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "30mb", extended: "true" }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));

app.use(cors());
app.use(express.json());

routesV1(app, process.env.APP_VERSION);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
