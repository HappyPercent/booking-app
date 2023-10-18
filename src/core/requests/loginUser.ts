import {BASE_ROUTE} from "../constants/requestRoutes";

export const loginUser = async (user: {password: string; username: string}) => {
  const responce = await fetch(`${BASE_ROUTE}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (responce.ok) {
    return responce;
  } else {
    throw new Error(String(responce.status));
  }
};
