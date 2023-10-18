import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../constants/localStorage";
import {BASE_ROUTE} from "../constants/requestRoutes";

export const getCityByCountry = (countryId: string) => {
  const url = new URL(`${BASE_ROUTE}/geo/city`);
  url.searchParams.append("countryId", countryId);
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
