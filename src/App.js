// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import CalculationAndCharacteristics from "./pages/CalculationAndCharacteristics";
import Correlation from "./pages/Correlation";
import Solver from "./pages/Solver";
import OptimalRiskyPortfolio from "./pages/Risky";
import CALAndEfficientFrontier from "./pages/CAL";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate replace to="/calculation" />} />
            <Route path="/calculation" element={<CalculationAndCharacteristics />} />
            <Route path="/correlation" element={<Correlation />} />
            <Route path="/solver" element={<Solver />} />
            <Route path="/optimal-risky-portfolio" element={<OptimalRiskyPortfolio />} />
            <Route path="/cal-efficient-frontier" element={<CALAndEfficientFrontier />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;