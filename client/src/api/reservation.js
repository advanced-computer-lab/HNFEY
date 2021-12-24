import API from "./index";

export const findAllReservations = (userId) =>
  API.get("/reservation/find-reservation?userId=" + userId);
