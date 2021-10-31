import { ITables } from "../tables";

export type ICsvState = string[][];

export enum csvActionEnum {
  PARSE_CSV = "PARSE_CSV",
}

export interface IParseCsvAction {
  type: csvActionEnum.PARSE_CSV,
  payload: ITables
}

export type ICsvAction = IParseCsvAction;