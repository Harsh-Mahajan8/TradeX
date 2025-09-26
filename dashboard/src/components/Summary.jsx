import { useContext } from "react";
import GeneralContext from "./GeneralContext/GeneralContext";
const Summary = ({ holdingLen, tInvestment, currValue, lp }) => {
  const safeLp = lp || { num: 0, per: 0 };
  const {userData} = useContext(GeneralContext);

  return (
    <>
      <div className="username">
        <h6>Hi, {userData.username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdingLen})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={safeLp.num > 0 ? "profit" : "loss"}>
              {safeLp.num > 0 ? "+" : ""}
              {(safeLp.num / 1000).toFixed(2)}k{" "}
              <small>+{safeLp.per.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{(currValue / 1000).toFixed(2)}k</span>{" "}
            </p>
            <p>
              Investment <span>{(tInvestment / 1000).toFixed(2)}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
