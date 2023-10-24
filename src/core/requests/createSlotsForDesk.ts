import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../constants/localStorage";
import {BASE_ROUTE} from "../constants/requestRoutes";

export const createSlotsForDesk = (
  deskId: number,
  slots: {
    dayOfWeek?: string;
    date?: string;
    dateTimeStart: string;
    dateTimeEnd: string;
    type?: string;
  }[]
) => {
  const url = new URL(`${BASE_ROUTE}/slot`);
  url.searchParams.append("deskId", String(deskId));
  const user = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || ""
  );
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user.username}:${user.password}` || "")}`,
    },
    body: JSON.stringify(slots),
  });
};
