import GeneralContext from "./GeneralContext/GeneralContext";
import { useContext } from "react";
import { VerticalChart } from "./VerticalChart";
const Positions = () => {
  const { positions } = useContext(GeneralContext);

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
                  <td className={profClass}>
                    {profClass == "profit" ? "+" : ""}
                    {lp}%
                  </td>
                  <td className={dayClass}>
                    {dayClass == "profit" ? "+" : ""}
                    {stock.day.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pt-5">
        <VerticalChart data={positions} />
      </div>
    </>
  );
};

export default Positions;
