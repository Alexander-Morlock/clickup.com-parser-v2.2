import { ReactElement } from "react";
import { ITableCell, ITableRow } from "../../redux/reducers/tables";
import { getLastElementOfArray } from "../../utils";
import { currencySymbol } from "../../utils/constants";
import Cell from "./Cell";

interface ITableProps {
  table: {
    tags: string[];
    member: {
      name: string;
      id: string;
      rate: number;
    };
    rows: ITableRow[];
    total: ITableCell[];
    totalMoney: number[];
  };
}

export default function Table({
  table: { tags, member, rows, total, totalMoney },
}: ITableProps): ReactElement {
  return (
    <>
      <tr>
        <td colSpan={tags.length + 2} className="table-member-header">
          {member.name} (id: {member.id})
        </td>
      </tr>
      <tr>
        <td className="table-header"></td>
        {tags.map((tag) => (
          <td
            className="table-header vertical-text"
            key={`${member.id}-${tag}`}
          >
            {tag}
          </td>
        ))}
        <td className="table-header">Day time</td>
        <td className="table-header">Tasks</td>
      </tr>
      {rows.map((row, y) => (
        <tr key={`${member.id}-${row.date}`}>
          <td>{row.date}</td>
          {row.cells.map((cell, i, arr) => {
            // last column is not tag but total day time
            if (i === arr.length - 1) {
              return false;
            }
            return (
              <Cell
                key={`${member.id}-${row.date}-cell${tags[i]}`}
                id={`${member.id}-${y}-${i}`}
                time={cell}
                editable={true}
              />
            );
          })}
          <Cell
            key={`${member.id}-${row.date}-totalDayTime`}
            id={`${member.id}-${y}-totalDayTime`}
            time={getLastElementOfArray(row.cells)}
            className="total-cell"
          />
          <td className="tasks">
            <i>{row.tasks}</i>
          </td>
        </tr>
      ))}
      <tr>
        <td className="total-cell">Total:</td>
        {total.map((tagTotal, i) => (
          <Cell
            key={`${member.id}-total${i}`}
            id={`${member.id}-total${i}`}
            time={tagTotal}
            className="total-cell"
          />
        ))}
      </tr>
      <tr className="total-money">
        <td>Total {currencySymbol}:</td>
        {totalMoney.map((money, i) => (
          <td key={`${member.id}-money${i}`}>
            {money ? `${money.toFixed(2)} ${currencySymbol}` : ""}
          </td>
        ))}
      </tr>
    </>
  );
}
