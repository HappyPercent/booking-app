import {BASE_ROUTE} from "../constants/requestRoutes";

export const loginUser = (user: {password: string; username: string}) => {
  return fetch(`${BASE_ROUTE}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
