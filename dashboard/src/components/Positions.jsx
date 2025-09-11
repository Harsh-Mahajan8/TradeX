import { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3002/allposition")
      .then((res) => {
        setPositions(res.data);
      })
      .catch((e) =>
        console.log("position data is not loading in Position.jsx" + e)
      );
  }, []);
  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
            {positions.map((stock, idx) => {
              const lp = (
                ((stock.price - stock.avg) / stock.avg) *
                100
              ).toFixed(2);
              const profClass = lp > 0 ? "profit" : "loss";
              const dayClass = stock.day < 0 ? "loss" : "profit";
              return (
                <tr key={idx}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{profClass == "profit"?"+": ""}{lp}%</td>
                  <td className={dayClass}>{dayClass == "profit"?"+": ""}{stock.day.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
