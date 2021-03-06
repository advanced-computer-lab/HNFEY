import API from "./index";

export const findAllReservations = (userId) =>
  API.get("/reservation/find-reservation?userId=" + userId);

export const editReservation = (reservationBody) =>
  API.put("/reservation/edit-reservation", reservationBody);

export const createReservation = (reservation) =>
  API.post("/reservation", reservation);

export const findReservation = (reservationId) =>
  API.get("/reservation/" + reservationId);

export const confirmReservation = (reservation) =>
  API.post("/reservation/confirm-flight", reservation);
