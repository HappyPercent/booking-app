import {BASE_ROUTE} from "../constants/requestRoutes";

export const createDesk = (desk: {
  countryId: string;
  cityId: string;
  name: string;
}) => {
  const url = new URL(`${BASE_ROUTE}/desk`);
  url.searchParams.append("countryId", desk.countryId);
  url.searchParams.append("cityId", desk.cityId);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name: desk.name}),
  });
};
