import API from "./index";

export const editUser = (user) =>
API.put("user/edit-user",user)