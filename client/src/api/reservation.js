import API from "./index";

export const findAllReservations = (userId) =>
  API.get("/reservation/find-reservation?userId=" + userId);

export const findReservation = (reservationId) =>
  API.get("/reservation/" + reservationId);

export const editReservation = (reservation) =>
API.put("/reservation/edit-reservation",reservation)




