import React from "react";

interface TableLoader {
  colSpan: number;
}

export const TableLoader: React.FC<TableLoader> = ({ colSpan }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center">
        <div className="table-loader">
          <div />
          <div />
          <div />
          <div />
        </div>
      </td>
    </tr>
  );
};
