import { ITiming } from "../../../api/types";

export enum filteredActionEnum {
  UPDATE_DATES = "UPDATE_DATES",
  SHIFT_DATES = "SHIFT_DATES",
  UPDATE_TAGS = "UPDATE_TAGS",
  UPDATE_TAG_CHECKED = "UPDATE_TAG_CHECKED",
  UPDATE_TAG_OPTION_CHECKED = "UPDATE_TAG_OPTION_CHECKED",
  FILTER_TIMING_BY_DATE = "FILTER_TIMING_BY_DATE",
}

export interface IDates {
  start: Date;
  end: Date;
}

export interface ITags {
  [key: string]: {
    isActive: boolean;
    isCalculated: boolean;
  };
}

interface IUpdateDatesAction {
  type: filteredActionEnum.UPDATE_DATES;
  payload: IDates;
}

export type IShiftDirection = "back" | "forward";

interface IShiftDatesAction {
  type: filteredActionEnum.SHIFT_DATES;
  payload: IShiftDirection;
}

interface IUpdateTagsAction {
  type: filteredActionEnum.UPDATE_TAGS;
}

interface IUpdateTagCheckedAction {
  type: filteredActionEnum.UPDATE_TAG_CHECKED;
  payload: string;
}

interface IUpdateTagOptionCheckedAction {
  type: filteredActionEnum.UPDATE_TAG_OPTION_CHECKED;
  payload: string;
}

interface IFilterTimingByDateAction {
  type: filteredActionEnum.FILTER_TIMING_BY_DATE;
  payload: ITiming;
}

export type IFilteredAction =
  | IUpdateDatesAction
  | IShiftDatesAction
  | IUpdateTagsAction
  | IUpdateTagCheckedAction
  | IUpdateTagOptionCheckedAction
  | IFilterTimingByDateAction;
