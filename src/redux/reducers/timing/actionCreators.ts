import { ITiming } from "../../../api/types";
import { ISetTimingAction, timingActionEnum } from "./types";

function setTiming(timing: ITiming): ISetTimingAction {
  return {
    type: timingActionEnum.SET_TIMING,
    payload: timing,
  };
}

export const timingActionCreator = {
  setTiming
};
