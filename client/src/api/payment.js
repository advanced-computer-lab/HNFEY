import API from "./index";

export const pay = (body) => API.post("payment/pay/", body);

export const refund = (body) => API.post("payment/refund", body);
