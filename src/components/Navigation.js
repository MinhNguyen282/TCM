// src/components/Navigation.js
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="bg-primary shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-white">
            TCM
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <NavLink
                  to="/calculation"
                  className={({ isActive }) =>
                    isActive
                      ? "text-accent font-semibold"
                      : "text-white hover:text-accent"
                  }
                >
                  Calculation and Characteristics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/correlation"
                  className={({ isActive }) =>
                    isActive
                      ? "text-accent font-semibold"
                      : "text-white hover:text-accent"
                  }
                >
                  Correlation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/solver"
                  className={({ isActive }) =>
                    isActive
                      ? "text-accent font-semibold"
                      : "text-white hover:text-accent"
                  }
                >
                  Solver
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/optimal-risky-portfolio"
                  className={({ isActive }) =>
                    isActive
                      ? "text-accent font-semibold"
                      : "text-white hover:text-accent"
                  }
                >
                  Optimal Risky Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cal-efficient-frontier"
                  className={({ isActive }) =>
                    isActive
                      ? "text-accent font-semibold"
                      : "text-white hover:text-accent"
                  }
                >
                  CAL & Efficient Frontier
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;