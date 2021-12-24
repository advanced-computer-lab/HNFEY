import API from "./index";

export const pay = (body) => API.post("payment/pay/", body);
