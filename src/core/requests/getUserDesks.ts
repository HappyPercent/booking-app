import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../constants/localStorage";
import {BASE_ROUTE} from "../constants/requestRoutes";
import {IDesk, IService} from "../constants/types";

export const getUserDesks = () => {
  const url = new URL(`${BASE_ROUTE}/desk/all`);
  const user = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || ""
  );
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user.username}:${user.password}` || "")}`,
    },
  }).then(
    (response) =>
      response.json() as Promise<{content: {desk: IDesk; proposal: IService}[]}>
  );
};
