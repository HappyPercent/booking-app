import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../constants/localStorage";
import {BASE_ROUTE} from "../constants/requestRoutes";

export const linkProposalToDesk = async (
  proposalId: number,
  deskId: number
) => {
  const url = new URL(`${BASE_ROUTE}/proposal/link`);
  url.searchParams.append("proposalId", String(proposalId));
  url.searchParams.append("deskId", String(deskId));
  const user = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || ""
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user.username}:${user.password}` || "")}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};
