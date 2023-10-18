import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../constants/localStorage";
import {BASE_ROUTE} from "../constants/requestRoutes";

export const getAllCountries = () => {
  const url = new URL(`${BASE_ROUTE}/geo/country`);
  url.searchParams.append("page", "0");
  url.searchParams.append("size", "500");
  const user = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || ""
  );
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user.username}:${user.password}` || "")}`,
    },
  }).then((response) => response.json());
};
