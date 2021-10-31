import { ITiming } from "../../../api/types";
import {
  filteredActionEnum,
  IDates,
  IFilteredAction,
  IShiftDirection,
} from "./types";

export function updateDates(dates: IDates): IFilteredAction {
  return {
    type: filteredActionEnum.UPDATE_DATES,
    payload: dates,
  };
}

export function shiftDates(direction: IShiftDirection): IFilteredAction {
  return {
    type: filteredActionEnum.SHIFT_DATES,
    payload: direction,
  };
}

export function updateTags(): IFilteredAction {
  return {
    type: filteredActionEnum.UPDATE_TAGS,
  };
}

export function updateTagChecked(tag: string): IFilteredAction {
  return {
    type: filteredActionEnum.UPDATE_TAG_CHECKED,
    payload: tag,
  };
}

export function updateTagOptionChecked(tag: string): IFilteredAction {
  return {
    type: filteredActionEnum.UPDATE_TAG_OPTION_CHECKED,
    payload: tag,
  };
}

export function filterTimingByDate(timing: ITiming): IFilteredAction {
  return {
    type: filteredActionEnum.FILTER_TIMING_BY_DATE,
    payload: timing,
  };
}
