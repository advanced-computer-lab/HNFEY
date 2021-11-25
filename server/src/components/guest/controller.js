const model = require("./model");

const findFlight = async (req, res, next) => {
  try {
    const flight = req.query;
    const queryClass = req.query.class;
    const queryPassengers = req.query.passengers;
    const flightResultsQuery = await model.findFlight(flight);

    var finalFlightResults = new Array();
    flightResultsQuery.map((flightResult) => {
      if (queryClass != undefined) {
        switch (queryClass) {
          case "Economy":
            if (
              flightResult.numberOfAvailableEconomySeats - queryPassengers >=
              0
            ) {
              finalFlightResults.push(flightResult);
            }
            break;
          case "Business":
            if (
              flightResult.numberOfAvailableBusinessSeats - queryPassengers >=
              0
            ) {
              finalFlightResults.push(flightResult);
            }
            break;
        }
      } else {
        finalFlightResults.push(flightResult);
      }
    });
    if (finalFlightResults) {
      console.log(finalFlightResults);
      //console.log(flightResults[0].from);
      req.flights = finalFlightResults;
      next();
    } else {
      const err = new Error("Cannot find flight");

      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const findFlightsPipeline = [
  //verify Admin,
  findFlight,
];

module.exports = {
  findFlightsPipeline,
};
