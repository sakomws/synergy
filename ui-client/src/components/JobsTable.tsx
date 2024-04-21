import React from "react";
import { EMOTION_COLORS } from "../pages/constants";

function hexToRGBA(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const JobsTable = ({ data }) => {
  if (!data.length) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]); // Dynamically determine the columns from the data

  const getCellStyle = (column, value) => {
    const num = parseFloat(value);
    if (num >= 0 && num <= 1) {
      const colorHex = EMOTION_COLORS[column] || "#cccccc"; // Default to grey if the emotion is not in the list
      const colorRGBA = hexToRGBA(colorHex, Math.max(0.1, num)); // Convert hex to RGBA with dynamic opacity

      return {
        backgroundColor: colorRGBA,
        color: "black", // Adjust text color for readability as needed
      };
    }
    return null; // No special style for non-emotion columns or invalid data
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} style={getCellStyle(column, row[column])}>
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
