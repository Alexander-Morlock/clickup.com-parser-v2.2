import { IUser } from "../../../api/types";
import { IFiltered } from "../filtered";
import { ITablesAction, tablesActionEnum } from "./types";

export function updateTables(
  filtered: IFiltered,
  members: IUser[]
): ITablesAction {
  return {
    type: tablesActionEnum.UPDATE_TABLES,
    payload: { filtered, members },
  };
}

export function updateTableCell(
  memberId: string,
  rowIndex: number,
  columnIndex: number,
  hours: number,
  minutes: number
): ITablesAction {
  return {
    type: tablesActionEnum.UPDATE_TABLE_CELL,
    payload: {
      memberId,
      rowIndex,
      columnIndex,
      hours,
      minutes,
    },
  };
}
