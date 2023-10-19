import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../constants/localStorage";
import {BASE_ROUTE} from "../constants/requestRoutes";

export const createDesk = (desk: {
  countryId: number;
  cityId: number;
  name: string;
}) => {
  const url = new URL(`${BASE_ROUTE}/desk`);
  url.searchParams.append("countryId", String(desk.countryId));
  url.searchParams.append("cityId", String(desk.cityId));
  const user = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || ""
  );
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user.username}:${user.password}` || "")}`,
    },
    body: JSON.stringify({name: desk.name}),
  });
};
