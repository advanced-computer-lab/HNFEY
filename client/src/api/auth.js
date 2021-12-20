import API from "./index";

export const createUser = (user) => API.post("/auth/register", user);

export const login = (user) => API.post("/auth/login", user);

export const loginAdmin = (admin) => API.post("/auth/login/admin", admin);

export const resetPassword = (passwordReset) =>
  API.post("/auth/password/reset", passwordReset);

export const updatePassword = (passwordUpdate) =>
  API.patch("/auth/password", passwordUpdate);
