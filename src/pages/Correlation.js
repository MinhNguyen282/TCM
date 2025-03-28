import { useState } from "react";
import correlationData from "../data/correlation.json";
import covarianceData from "../data/covariance.json";

const Correlation = () => {
  // Available stock list.
  const stocks = ["GAS", "VCB", "VNM", "FPT", "BMP"];

  // State for the chosen stock.
  const [selectedStock, setSelectedStock] = useState(null);

  // Build the table rows for the selected stock against all stocks.
  const tableData =
    selectedStock &&
    stocks.map((otherStock) => {
      // Find correlation & covariance rows for the pair.
      const corrRow = correlationData.find(
        (item) =>
          item.Stock1 === selectedStock && item.Stock2 === otherStock
      );
      const covRow = covarianceData.find(
        (item) =>
          item.Stock1 === selectedStock && item.Stock2 === otherStock
      );
      return {
        otherStock,
        correlation: corrRow ? corrRow.Correlation : "N/A",
        covariance: covRow ? covRow.Covariance : null,
      };
    });

  // Find the maximum covariance value (for scaling the bar graph).
  const maxCovariance =
    tableData && Math.max(...tableData.map((item) => item.covariance || 0));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 border-b pb-3">
        Correlation & Covariance
      </h2>

      {/* Section 1: Stock Buttons */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Select Stock</h3>
        <div className="flex flex-wrap gap-3">
          {stocks.map((stock) => (
            <button
              key={stock}
              onClick={() => setSelectedStock(stock)}
              className={`py-2 px-4 border rounded transition-colors text-center 
                ${
                  selectedStock === stock
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:bg-gray-200"
                }`}
            >
              {stock}
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Table of Correlation and Covariance */}
      <div className="bg-white p-6 rounded shadow-md mb-6 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Table Detail</h3>
        {selectedStock ? (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-3 border">Stock Pair</th>
                <th className="py-2 px-3 border">Correlation</th>
                <th className="py-2 px-3 border">Covariance</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="text-center hover:bg-gray-100">
                  <td className="py-2 px-3 border">
                    {selectedStock} * {row.otherStock}
                  </td>
                  <td className="py-2 px-3 border">
                    {row.correlation !== "N/A"
                      ? row.correlation.toFixed(3)
                      : "N/A"}
                  </td>
                  <td className="py-2 px-3 border">
                    {row.covariance !== null
                      ? (100*row.covariance).toFixed(3)
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500">
            Please select a stock to view data.
          </div>
        )}
      </div>

      {/* Section 3: Bar Graph of Covariance (two horizontal sections) */}
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Covariance Bar Graph</h3>
        {selectedStock ? (
          <div className="space-y-4">
            {tableData.map((row, idx) => {
              // Only render if covariance exists.
              if (row.covariance === null) return null;
              // Determine bar width as a percentage of the maximum covariance.
              const barWidth =
                maxCovariance > 0
                  ? (row.covariance / maxCovariance) * 100
                  : 0;
              return (
                <div key={idx} className="flex items-center">
                  {/* Left section: combination name and covariance value */}
                  <div className="w-1/3 text-sm font-medium">
                    {selectedStock} * {row.otherStock}
                  </div>
                  {/* Right Section: Bar Graph */}
                  <div className="w-2/3">
                    <div className="w-full bg-gray-200 h-4 rounded flex justify-center items-center">
                      <div
                        className="h-4 rounded bg-blue-500"
                        style={{ width: `${barWidth}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-500">
            Please select a stock to see the graph.
          </div>
        )}
      </div>
    </div>
  );
};

export default Correlation;