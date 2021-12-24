import API from "./index";

export const editFlight = (flightBody) =>
  API.put("/flight/edit-flight", flightBody);

export const createFlight = (flight) =>
  API.post("/flight/create-flight", flight);
