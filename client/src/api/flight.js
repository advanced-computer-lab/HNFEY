import API from "./index";

export const editFlight = (flightBody) =>
  API.put("/flight/edit-flight", flightBody);
