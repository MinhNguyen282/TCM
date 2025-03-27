import { useState } from "react";
import characteristicData from "../data/characteristic.json";

// Preload all images from the folder using require.context  
const imagesContext = require.context("../images/characteristic", false, /\.png$/);
const imagesMap = imagesContext.keys().reduce((acc, path) => {
  // Remove the leading './' from the key
  const key = path.replace("./", "");
  acc[key] = imagesContext(path);
  return acc;
}, {});

const CalculationAndCharacteristics = () => {
  // State for selected options
  const [selectedName, setSelectedName] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // Arrays for the buttons
  const names = ["GAS", "VCB", "VNM", "FPT", "BMP"];
  const years = [2020, 2021, 2022, 2023, 2024, 2025];

  // Filter the data based on selected options
  const filteredData = characteristicData.filter((item) => {
    return (
      (selectedName ? item.name === selectedName : true) &&
      (selectedYear ? item.year === selectedYear : true)
    );
  });

  // Determine the image file name based on selected name and year.
  // Expecting image names like GAS_2020.png inside src/images/characteristic.
  let imageFileName = null;
  if (selectedName && selectedYear) {
    imageFileName = `${selectedName}_${selectedYear}.png`;
  }
  // Retrieve the image path from the preloaded imagesMap.
  const imagePath = imageFileName ? imagesMap[imageFileName] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Table */}
        <div className="md:w-1/3 bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Data Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 border">Name</th>
                  <th className="py-3 px-4 border">Year</th>
                  <th className="py-3 px-4 border">Month</th>
                  <th className="py-3 px-4 border">Price</th>
                  <th className="py-3 px-4 border">Return</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100">
                    <td className="py-2 px-4 border">{item.name}</td>
                    <td className="py-2 px-4 border">{item.year}</td>
                    <td className="py-2 px-4 border">{item.month}</td>
                    <td className="py-2 px-4 border">${item.price.toLocaleString()}</td>
                    <td className="py-2 px-4 border">
                      {item.return === null ? "N/A" : (100*item.return).toFixed(1) + "%"}
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td className="py-2 px-4 border text-center" colSpan="5">
                      No matching data!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 flex flex-col gap-8">
          {/* Upper Chosen Options Section */}
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Choose Options</h2>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Vertical Section: Name Buttons */}
              <div className="flex-1">
                <h3 className="mb-3 text-lg font-medium">Select Name</h3>
                <div className="flex flex-wrap gap-3">
                  {names.map((name) => (
                    <button
                      key={name}
                      onClick={() => setSelectedName(name)}
                      className={`w-20 py-2 border rounded transition-colors ${
                        selectedName === name
                          ? "bg-secondary text-white border-secondary"
                          : "bg-white text-primary hover:bg-gray-200"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Vertical Section: Year Buttons */}
              <div className="flex-1">
                <h3 className="mb-3 text-lg font-medium">Select Year</h3>
                <div className="flex flex-wrap gap-3">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`w-20 py-2 border rounded transition-colors ${
                        selectedYear === year
                          ? "bg-secondary text-white border-secondary"
                          : "bg-white text-primary hover:bg-gray-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: Image Display */}
          <div className="bg-white p-6 rounded shadow-md flex justify-center">
            {imagePath ? (
              <img
                src={imagePath.default || imagePath}
                alt={`${selectedName} ${selectedYear}`}
                className="max-w-full h-auto"
              />
            ) : (
              <div className="text-gray-500">
                {selectedName && selectedYear
                  ? "Image not available for the selected combination."
                  : "Please select both a name and a year to see the corresponding image."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationAndCharacteristics;