import { useState } from "react";
import solverData from "../data/solver.json";
import sratio from "../images/SRATIO.png"; // Adjust import if needed

const Solver = () => {
  // Convert the solver object into an array.
  const solverArray = Object.values(solverData);
  
  // Extract unique combinations.
  const combinations = Array.from(new Set(solverArray.map(item => item.combination)));

  // State for selected combination.
  const [selectedCombination, setSelectedCombination] = useState(null);

  // Compute the maximum Sharpe ratio across solver items.
  const maxSharpe = solverArray.reduce((max, cur) => {
    const sr = parseFloat(cur.sharpe_ratio);
    return sr > max ? sr : max;
  }, 0);

  // Filter the table data based on the chosen combination.
  const filteredSolverData = selectedCombination 
    ? solverArray.filter(item => item.combination === selectedCombination)
    : solverArray;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      
      {/* Upper Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Choice Selector (1/4 width) */}
        <div className="md:w-1/4 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Choose Combination</h3>
          <div className="flex flex-col gap-2">
            {combinations.map((combo, index) => (
              <button
                key={index}
                onClick={() => setSelectedCombination(combo)}
                className={`py-2 px-4 border rounded transition-colors text-center 
                  ${
                    selectedCombination === combo
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 hover:bg-gray-200"
                  }`}
              >
                {combo}
              </button>
            ))}
          </div>
        </div>
        {/* Right: Display SRATIO Image (3/4 width) */}
        <div className="md:w-3/4 bg-white p-6 rounded shadow-md flex justify-center items-center">
          <img src={sratio} alt="SRatio Chart" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Lower Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Table displays the solver data, filtered by selected combination */}
        <div className="md:w-2/3 bg-white p-6 rounded shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Solver Data Table</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-3 border">Combination</th>
                <th className="py-2 px-3 border">Stock i</th>
                <th className="py-2 px-3 border">Stock j</th>
                <th className="py-2 px-3 border">Stock k</th>
                <th className="py-2 px-3 border">wi</th>
                <th className="py-2 px-3 border">wj</th>
                <th className="py-2 px-3 border">wk</th>
                <th className="py-2 px-3 border">Total</th>
                <th className="py-2 px-3 border">E(ri)</th>
                <th className="py-2 px-3 border">E(rj)</th>
                <th className="py-2 px-3 border">E(rk)</th>
                <th className="py-2 px-3 border">σi</th>
                <th className="py-2 px-3 border">σj</th>
                <th className="py-2 px-3 border">σk</th>
                <th className="py-2 px-3 border">cov(i,j)</th>
                <th className="py-2 px-3 border">cov(i,k)</th>
                <th className="py-2 px-3 border">cov(j,k)</th>
                <th className="py-2 px-3 border">E(rp)</th>
                <th className="py-2 px-3 border">σp</th>
                <th className="py-2 px-3 border">Sharpe Ratio</th>
              </tr>
            </thead>
            <tbody>
              {filteredSolverData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-100 text-center">
                  <td className="py-2 px-3 border">{item.combination}</td>
                  <td className="py-2 px-3 border">{item["stock i"]}</td>
                  <td className="py-2 px-3 border">{item["stock j"]}</td>
                  <td className="py-2 px-3 border">{item["stock k"]}</td>
                  <td className="py-2 px-3 border">{item.wi.toFixed(2)}</td>
                  <td className="py-2 px-3 border">{item.wj.toFixed(2)}</td>
                  <td className="py-2 px-3 border">{item.wk.toFixed(2)}</td>
                  <td className="py-2 px-3 border">{item.total.toFixed(2)}</td>
                  <td className="py-2 px-3 border">{(100*item["E(ri)"]).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item["E(rj)"]).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item["E(rk)"]).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item.sigma_i).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item.sigma_j).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item.sigma_k).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item.cov_i_j).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item.cov_i_k).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item.cov_j_k).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item["E(rp)"]).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item.sigma_p).toFixed(3)+"%"}</td>
                  <td className="py-2 px-3 border">{(100*item.sharpe_ratio).toFixed(3)+"%"}</td>
                </tr>
              ))}
              {filteredSolverData.length === 0 && (
                <tr>
                  <td className="py-2 px-3 border text-center" colSpan="20">
                    No data available for the selected combination.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right: Rounded box displaying the maximum Sharpe ratio */}
        <div className="md:w-1/3 bg-white p-6 rounded shadow-md flex justify-center items-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Max Sharpe Ratio</h3>
            <p className="text-4xl font-extrabold text-blue-600">
              {(100*maxSharpe).toFixed(2)+"%"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solver;