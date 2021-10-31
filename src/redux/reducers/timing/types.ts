import { ITiming } from "../../../api/types";

export enum timingActionEnum {
  SET_TIMING = "SET_TIMING",
}

export interface ISetTimingAction {
  type: timingActionEnum.SET_TIMING;
  payload: ITiming;
};