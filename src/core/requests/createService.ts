import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../constants/localStorage";
import {BASE_ROUTE} from "../constants/requestRoutes";

export const createService = (service: {
  name: string;
  category: string;
  shortDescr: string;
  descr: string;
  duration: number;
  price: number;
}) => {
  const url = new URL(`${BASE_ROUTE}/proposal`);
  const user = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || ""
  );
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user.username}:${user.password}` || "")}`,
    },
    body: JSON.stringify(service),
  });
};
