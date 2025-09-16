import { Route, Routes } from "react-router-dom";
import { useState, useCallback } from "react";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import StockDetailList from "./StockDetailList";
const Dashboard = () => {
  const [summary, setSummary] = useState({
    holdingLen: 0,
    tInvestment: 0,
    currValue: 0,
    lp: { per: 0, num: 0 },
  });

  const updateSummary = useCallback((data) => {
    setSummary(data);
  }, []);

  return (
    <div className="dashboard-container">
      <StockDetailList />

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary {...summary} />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/holdings"
            element={<Holdings updateSummary={updateSummary} />}
          />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
