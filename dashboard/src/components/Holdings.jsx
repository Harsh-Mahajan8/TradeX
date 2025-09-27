import { useEffect, useRef } from "react";
import GeneralContext from "./GeneralContext/GeneralContext";
import { useContext } from "react";
import { VerticalChart } from "./VerticalChart";

const Holdings = ({ updateSummary }) => {
  const { holdings } = useContext(GeneralContext);

  const updateSummaryRef = useRef(updateSummary);

  // Update the ref when updateSummary changes
  useEffect(() => {
    updateSummaryRef.current = updateSummary;
  }, [updateSummary]);

  // Move updateSummary call inside useEffect and remove updateSummary from dependencies
  useEffect(() => {
    if (holdings.length === 0) {
      updateSummaryRef.current({
        holdingLen: 0,
        tInvestment: 0,
        currValue: 0,
        lp: { per: 0, num: 0 },
      });
      return;
    }

    const totalInvestment = holdings.reduce(
      (sum, s) => sum + (s.avg || 0) * (s.qty || 0),
      0
    );
    const currentValue = holdings.reduce(
      (sum, s) => sum + (s.price || 0) * (s.qty || 0),
      0
    );
    const pnlAbs = currentValue - totalInvestment;
    const pnlPct = totalInvestment ? (pnlAbs / totalInvestment) * 100 : 0;

    updateSummaryRef.current({
      holdingLen: holdings.length,
      tInvestment: totalInvestment,
      currValue: currentValue,
      lp: { per: pnlPct, num: pnlAbs },
    });
  }, [holdings]); // Only depend on holdings

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>

            {holdings.map((stock, idx) => {
              const curValue = (stock.price || 0) * (stock.qty || 0);
              const lp = stock.avg
                ? (((stock.price || 0) - stock.avg) / stock.avg) * 100
                : 0;
              const profClass = lp > 0 ? "profit" : "loss";
              const NetClass = (stock.net || 0) > 0 ? "profit" : "loss";
              const dayClass = (stock.day || 0) < 0 ? "loss" : "profit";

              return (
                <tr key={idx}>
                  <td>{stock.name || "N/A"}</td>
                  <td>{stock.qty || 0}</td>
                  <td>{(stock.avg || 0).toFixed(2)}</td>
                  <td>{(stock.price || 0).toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {profClass === "profit" ? "+" : ""}
                    {lp.toFixed(2)}%
                  </td>
                  <td className={NetClass}>
                    {NetClass === "profit" ? "+" : ""}
                    {(stock.net || 0).toFixed(2)}%
                  </td>
                  <td className={dayClass}>
                    {dayClass === "profit" ? "+" : ""}
                    {(stock.day || 0).toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            ₹{" "}
            {holdings
              .reduce((sum, s) => sum + (s.avg || 0) * (s.qty || 0), 0)
              .toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            ₹{" "}
            {holdings
              .reduce((sum, s) => sum + (s.price || 0) * (s.qty || 0), 0)
              .toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5
            className={
              holdings.reduce(
                (sum, s) => sum + (s.price || 0) * (s.qty || 0),
                0
              ) -
                holdings.reduce(
                  (sum, s) => sum + (s.avg || 0) * (s.qty || 0),
                  0
                ) >
              0
                ? "profit"
                : "loss"
            }
          >
            ₹
            {(
              holdings.reduce(
                (sum, s) => sum + (s.price || 0) * (s.qty || 0),
                0
              ) -
              holdings.reduce((sum, s) => sum + (s.avg || 0) * (s.qty || 0), 0)
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            (
            {(holdings.reduce((sum, s) => sum + (s.avg || 0) * (s.qty || 0), 0)
              ? ((holdings.reduce(
                  (sum, s) => sum + (s.price || 0) * (s.qty || 0),
                  0
                ) -
                  holdings.reduce(
                    (sum, s) => sum + (s.avg || 0) * (s.qty || 0),
                    0
                  )) /
                  holdings.reduce(
                    (sum, s) => sum + (s.avg || 0) * (s.qty || 0),
                    0
                  )) *
                100
              : 0
            ).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <div className="pt-5">
        {holdings.length!=0 && <VerticalChart data={holdings} />}
      </div>
    </>
  );
};

export default Holdings;
