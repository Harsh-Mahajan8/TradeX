import { Link } from "react-router-dom";
import formatTine from "../timeFormat";
import GeneralContext from "./GeneralContext/GeneralContext";
import { useContext } from "react";
const Orders = () => {
  const {orders}=useContext(GeneralContext);
  
  return (
    <div className="orders">
      {orders.length == 0 && (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      )}
      {orders.length > 0 && (
        <div className="order-table">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Mode</th>
                <th>Order Status</th>
                <th>Price</th>
                <th>Qty.</th>
                <th>Date/Time</th>
              </tr>

              {orders.map((stock, idx) => {
                let orderClass = `orderStatus ${
                  stock.orderStatus === "Executed"
                    ? "bg-green-600/80"
                    : "bg-red-500/80"
                }`;
                return (
                  <tr key={idx}>
                    <td>{stock.name}</td>
                    <td>{stock.mode}</td>
                    <td>
                      <span className={orderClass}>{stock.orderStatus}</span>
                    </td>
                    <td>{stock.price}</td>
                    <td>{stock.qty}</td>
                    <td>{formatTine(stock.time)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
