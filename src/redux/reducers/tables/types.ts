import { IUser } from "../../../api/types";
import { IFiltered } from "../filtered";

export enum tablesActionEnum {
  UPDATE_TABLES = "UPDATE_TABLES",
  UPDATE_TABLE_CELL = "UPDATE_TABLE_CELL",
}

interface ITablesUpdateAction {
  type: tablesActionEnum.UPDATE_TABLES;
  payload: {
    filtered: IFiltered,
    members: IUser[],
  }
}

export interface IEditableCell {
  memberId: string,
  rowIndex: number,
  columnIndex: number,
  hours: number,
  minutes: number
}

interface ITableUpdateCellAction {
  type: tablesActionEnum.UPDATE_TABLE_CELL,
  payload: IEditableCell
}

export type ITablesAction = ITablesUpdateAction | ITableUpdateCellAction;
