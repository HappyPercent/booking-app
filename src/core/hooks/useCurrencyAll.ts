import {useQuery} from "@tanstack/react-query";
import api from "../../client/api";

export const useCurrencyAll = () =>
  useQuery(["currency-list"], api.getCurrencyAll);
