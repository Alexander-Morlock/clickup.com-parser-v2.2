import React, { ReactElement } from "react";
import { useTypedSelector } from "../../hooks";
import Table from "./Table";

export default function Tables(): ReactElement {
  const { tables } = useTypedSelector((state) => state);
  
  return (
    <table className="tables-wrapper">
      <thead></thead>
      <tbody>
        {Object.keys(tables).map((memberId) => tables[memberId].rows.length > 0 && (
          <Table
            key={`table-${memberId}`}
            table={tables[memberId]}
          />
        ))}
      </tbody>
    </table>
  );
}
