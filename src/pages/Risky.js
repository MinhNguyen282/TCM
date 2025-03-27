import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import risky1 from "../data/risky1.json";
import risky2 from "../data/risky2.json";
import risky3 from "../data/risky3.json";

ChartJS.register(ArcElement, Tooltip, Legend);

const OptimalRiskyPortfolio = () => {
  // Helper function to render a table from an array of objects.
  const renderTable = (data) => {
    if (!data || data.length === 0) return <div>No data available.</div>;
    const headers = Object.keys(data[0]);
    return (
      <table className="min-w-full text-sm border">
        <thead>
          <tr className="bg-gray-800 text-white">
            {headers.map((header, idx) => (
              <th key={idx} className="py-2 px-3 border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              {headers.map((header, i) => (
                <td key={i} className="py-2 px-3 border text-center">
                  {row[header] !== null && row[header] !== undefined ? row[header] : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Hardcoded data for the pie chart.
  const pieData = {
    labels: ["VCB", "FPT", "BMP"],
    datasets: [
      {
        label: "% Weight",
        data: [5.00, 72.20, 22.30],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderColor: ["#1d4ed8", "#047857", "#b45309"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  // Extract values for E(rp) and 𝞼p from risky2.json.
  const eRpValue = 0.03;
  const sigmaPValue = 0.07;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Upper Section: Three horizontal panels for risky1, risky2, risky3 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">Risky1 Data</h3>
          {renderTable(risky1)}
        </div>
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">Risky2 Data</h3>
          {renderTable(risky2)}
        </div>
        <div className="md:w-1/3 bg-white p-4 rounded shadow-md overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">Risky3 Data</h3>
          {renderTable(risky3)}
        </div>
      </div>

      {/* Lower Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Hardcoded Pie Chart */}
        <div className="md:w-1/2 bg-white p-6 rounded shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">
            Portfolio Weights (VCB, FPT, BMP)
          </h3>
          <div className="w-64 h-64">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
        {/* Right: Two vertical boxes for E(rp) and 𝞼p */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="bg-blue-100 p-6 rounded shadow-md flex justify-center items-center">
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2">E(rp)</h4>
              <p className="text-4xl font-extrabold text-blue-600">{eRpValue}</p>
            </div>
          </div>
          <div className="bg-green-100 p-6 rounded shadow-md flex justify-center items-center">
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2">𝞼p</h4>
              <p className="text-4xl font-extrabold text-green-600">{sigmaPValue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalRiskyPortfolio;