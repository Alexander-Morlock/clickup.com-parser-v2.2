import { getTimeFromCell } from "../../../utils";
import { currencySymbol } from "../../../utils/constants";
import { csvActionEnum, ICsvAction, ICsvState } from "./types";

const initialState: ICsvState = [[]];

export default function authReducer(
  state = initialState,
  action: ICsvAction
): ICsvState {
  switch (action.type) {
    case csvActionEnum.PARSE_CSV:
      const timing = action.payload;
      const newCsv: ICsvState = [];
      Object.keys(timing).forEach((memberId) => {
        const memberTiming = timing[memberId];

        const tableHeader = [`${memberTiming.member.name} (ID: ${memberId})`];
        const tableTags = ["Date", ...memberTiming.tags, "Total", "Tasks"];
        newCsv.push(tableHeader, tableTags);

        memberTiming.rows.forEach((row) => {
          const tableRow = [
            row.date,
            ...row.cells.map((cell) => getTimeFromCell(cell)),
            row.tasks,
          ];
          newCsv.push(tableRow);
        });

        const tableTotal = [
          "Total:",
          ...memberTiming.total.map((cell) => getTimeFromCell(cell)),
        ];
        const tableTotalMoney = [
          `Total ${currencySymbol}:`,
          ...memberTiming.totalMoney.map((money) =>
            money ? `${money.toFixed(2)} ${currencySymbol}` : ""
          ),
        ];
        newCsv.push(tableTotal, tableTotalMoney);
        newCsv.push([]);
      });
      return newCsv;

    default:
      return state;
  }
}
