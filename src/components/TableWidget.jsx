import React from 'react';

function TableWidget({ data }) {
  if (!data.headers || !data.rows) {
    return <p>Invalid table data</p>;
  }
  
  return (
    <table className="table-widget-content">
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableWidget;