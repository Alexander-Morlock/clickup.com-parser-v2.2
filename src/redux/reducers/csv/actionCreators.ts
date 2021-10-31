import { ITables } from "../tables";
import { csvActionEnum, ICsvAction } from "./types";

export function parseCsv(data: ITables): ICsvAction {
  return {
    type: csvActionEnum.PARSE_CSV,
    payload: data
  };
}