import { ITiming } from "../../../api/types";
import { ISetTimingAction, timingActionEnum } from "./types";

const initialState = {} as ITiming;

export default function timingReducer(
  state = initialState,
  action: ISetTimingAction
): ITiming {
  switch (action.type) {
    case timingActionEnum.SET_TIMING:
      return action.payload;

    default:
      return state;
  }
}
