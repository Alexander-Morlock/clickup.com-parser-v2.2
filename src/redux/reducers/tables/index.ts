import { IUser } from "../../../api/types";
import {
  getDateFromUnixStamp,
  getCellState,
  getReducedRow,
  getReducedNumberArray,
} from "../../../utils";
import { ITablesAction, tablesActionEnum } from "./types";

export interface ITables {
  [key: string]: ITable;
}

export interface ITable {
  tags: string[];
  member: {
    name: string;
    id: string;
    rate: number;
  };
  rows: ITableRow[];
  total: ITableCell[];
  totalMoney: number[];
}

export type ITableRow = {
  date: string;
  tasks: string;
  cells: ITableCell[];
};

export interface ITableCell {
  hours: number;
  minutes: number;
}

const initialState: ITables = {};

export default function tablesReducer(
  state = initialState,
  action: ITablesAction
): ITables {
  switch (action.type) {
    case tablesActionEnum.UPDATE_TABLES: {
      const { members, filtered } = action.payload;
      const timing = filtered.timing;
      const tags: string[] = Object.entries(filtered.tags)
        .filter((tag) => tag[1].isActive)
        .map((tag) => tag[0])
        .sort();

      members.forEach((member) => {
        if (!member.active && timing[member.id]) {
          delete timing[member.id];
        }
      });

      const tables: ITables = {};

      Object.keys(timing).forEach((memberId) => {
        const rows: ITableRow[] = [];
        const memberTiming = timing[memberId];
        const dates = [
          ...new Set(
            memberTiming.map((entry) => getDateFromUnixStamp(entry.start))
          ),
        ];

        // new row for each date
        dates.forEach((date) => {
          const timingForThisDay = memberTiming.filter(
            (entry) => getDateFromUnixStamp(entry.start) === date
          );

          const tasks = [
            ...new Set(timingForThisDay.map((entry) => entry.task.name)),
          ].join(", ");

          const row: ITableRow = {
            date,
            cells: [],
            tasks,
          };

          tags.forEach((tag) => {
            const totalTagMinutesThisDay: number = timingForThisDay
              .filter((entry) => entry.tags.join(" + ") === tag)
              .reduce(
                (acc, entry) => acc + Math.floor(+entry.duration / 60000), 0
              );

            row.cells.push(getCellState(totalTagMinutesThisDay));
          });

          row.cells.push(getReducedRow(row.cells));

          // if the row is not full empty - add to table
          const totalCell = getReducedRow(row.cells);
          if (totalCell.hours + totalCell.minutes > 0) {
            rows.push(row);
          }
        });

        const member =
          members.find((member) => member.id === memberId) || ({} as IUser);

        const total: ITableCell[] = [];
        const totalMoney = [] as number[];

        for (let i = 0; i < tags.length; i++) {
          const totalColumnMinutes = rows.reduce(
            (acc, row) =>
              acc + row.cells[i].minutes + row.cells[i].hours * 60, 0
          );
          total.push(getCellState(totalColumnMinutes));
          totalMoney.push(
            filtered.tags[tags[i]].isCalculated
              ? (totalColumnMinutes / 60) * (+member.rate)
              : 0
          );
        }
        total.push(getReducedRow(total));
        totalMoney.push(getReducedNumberArray(totalMoney));

        const table: ITable = {
          tags: tags,
          member: {
            name: member.name,
            id: member.id,
            rate: +member.rate,
          },
          rows,
          total,
          totalMoney,
        };

        tables[memberId] = table;
      });

      return tables;
    }

    case tablesActionEnum.UPDATE_TABLE_CELL: {
      const { memberId, rowIndex, columnIndex, hours, minutes } =
        action.payload;

      const updatedMemberTable = { ...state[memberId] };
      updatedMemberTable.rows[rowIndex].cells[columnIndex].hours = hours;
      updatedMemberTable.rows[rowIndex].cells[columnIndex].minutes = minutes;

      const totalMinutesThisColumn = updatedMemberTable.rows.reduce(
        (acc, row) =>
          acc +
          row.cells[columnIndex].hours * 60 +
          row.cells[columnIndex].minutes, 0
      );

      // total day time
      updatedMemberTable.rows[rowIndex].cells.pop();
      updatedMemberTable.rows[rowIndex].cells.push(
        getReducedRow(updatedMemberTable.rows[rowIndex].cells)
      );

      // total tag column time
      updatedMemberTable.total[columnIndex] = getCellState(
        totalMinutesThisColumn
      );

      // total time
      updatedMemberTable.total.pop();
      updatedMemberTable.total.push(getReducedRow(updatedMemberTable.total));

      // total tag column money
      updatedMemberTable.totalMoney[columnIndex] =
        (totalMinutesThisColumn / 60) * updatedMemberTable.member.rate;

      // total money
      updatedMemberTable.totalMoney.pop();
      updatedMemberTable.totalMoney.push(
        getReducedNumberArray(updatedMemberTable.totalMoney)
      );

      return {
        ...state,
        [memberId]: updatedMemberTable,
      };
    }

    default:
      return state;
  }
}
