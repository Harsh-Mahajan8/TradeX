import axios from "axios";
import { useEffect, useState } from "react";
const Holdings = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allholding").then((res) => {
      setHoldings(res.data);
    });
  }, []);
  const totalInvestment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const currentValue = holdings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const pnlAbs = currentValue - totalInvestment;
  const pnlPct = totalInvestment ? (pnlAbs / totalInvestment) * 100 : 0;
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
              const curValue = stock.price * stock.qty;
              // const isProfit = stock.net - stock.avg * stock.qty >= 0.0;
              const lp = (
                ((stock.price - stock.avg) / stock.avg) *
                100
              ).toFixed(2);
              const profClass = lp > 0 ? "profit" : "loss";
              const NetClass = stock.net > 0 ? "profit" : "loss";
              const dayClass = stock.day < 0 ? "loss" : "profit";
              return (
                <tr key={idx}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{lp}%</td>
                  <td className={NetClass}>{stock.net.toFixed(2)}%</td>
                  <td className={dayClass}>{stock.day.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {pnlAbs.toFixed(2)} ({pnlPct.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
