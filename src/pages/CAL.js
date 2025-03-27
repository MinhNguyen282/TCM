import React from "react";
import table1Data from "../data/table1.json";

const CALAndEfficientFrontier = () => {
  // -----------------------------
  // Upper Section: Table from table1.json with fixed height & scroll.
  // -----------------------------
  const renderTable1 = () => {
    if (!table1Data || !table1Data.length) return <div>No data available.</div>;
    // Get headers dynamically from the first row
    const headers = Object.keys(table1Data[0]);
    return (
      <div className="max-h-48 overflow-y-auto">
        <table className="min-w-full text-sm border">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-800 text-white">
              {headers.map((header, idx) => (
                <th key={idx} className="py-2 px-3 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table1Data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-100 text-center">
                {headers.map((header, i) => {
                  const cellValue = row[header];
                  // Try to convert the value to a Number.
                  const numVal = Number(cellValue);
                  const displayValue = !isNaN(numVal)
                    ? (numVal * 100).toFixed(2)
                    : cellValue;
                  return (
                    <td key={i} className="py-2 px-3 border">
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  // -----------------------------
  // Middle Section Fixed Data:
  // Left Table: Mean Variance Efficient Portfolio
  const meanVariancePortfolio = {
    headers: [
      "w(VCB)",
      "w(FPT)",
      "w(BMP)",
      "Total",
      "E(r)",
      "Var",
      "Std",
      "Sharpe Ratio"
    ],
    row: ["5%", "73%", "22%", "100%", "0.0316", "0.0053", "0.0727", "0.3311"]
  };

  // Middle Table: Minimum Variance Portfolio
  const minVariancePortfolio = {
    headers: [
      "w(VCB)",
      "w(FPT)",
      "w(BMP)",
      "Total",
      "E(r)",
      "Var",
      "Std",
      "Sharpe Ratio"
    ],
    row: ["0%", "100%", "0%", "100%", "0.034", "0.0066", "0.081", "0.322"]
  };

  // Right Table: Correlation table
  const correlationTable = {
    headers: ["", "VCB", "FPT", "BMP"],
    rows: [
      { label: "VCB", data: ["1", "0.3769", "0.4035"] },
      { label: "FPT", data: ["0.3769", "1", "0.3967"] },
      { label: "BMP", data: ["0.4035", "0.3967", "1"] }
    ]
  };

  // -----------------------------

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Upper Section */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Data</h2>
        {renderTable1()}
      </div>

      {/* Middle Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Mean Variance Efficient Portfolio */}
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">
            Mean Variance Efficient Portfolio
          </h3>
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-200">
                {meanVariancePortfolio.headers.map((head, idx) => (
                  <th key={idx} className="py-2 px-3 border">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 text-center">
                {meanVariancePortfolio.row.map((value, idx) => (
                  <td key={idx} className="py-2 px-3 border">
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {/* Middle: Minimum Variance Portfolio */}
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">
            Minimum Variance Portfolio
          </h3>
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-200">
                {minVariancePortfolio.headers.map((head, idx) => (
                  <th key={idx} className="py-2 px-3 border">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 text-center">
                {minVariancePortfolio.row.map((value, idx) => (
                  <td key={idx} className="py-2 px-3 border">
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {/* Right: Correlation Table */}
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">Correlation</h3>
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-200 text-center">
                {correlationTable.headers.map((head, idx) => (
                  <th key={idx} className="py-2 px-3 border">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlationTable.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-3 border font-semibold">
                    {row.label}
                  </td>
                  {row.data.map((value, i) => (
                    <td key={i} className="py-2 px-3 border">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lower Section: Three images horizontally */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md flex justify-center items-center">
          <img
            src="/image/Picture1.png"
            alt="Picture1"
            className="max-w-full h-auto"
          />
        </div>
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md flex justify-center items-center">
          <img
            src="/image/Picture2.png"
            alt="Picture2"
            className="max-w-full h-auto"
          />
        </div>
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md flex justify-center items-center">
          <img
            src="/image/Picture3.png"
            alt="Picture3"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CALAndEfficientFrontier;