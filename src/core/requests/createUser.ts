import {BASE_ROUTE} from "../constants/requestRoutes";

export const createUser = (user: {password: string; username: string}) => {
  return fetch(`${BASE_ROUTE}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
