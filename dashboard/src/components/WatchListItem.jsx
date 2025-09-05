import { useState, useRef } from "react";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
  Delete,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";

function WatchListItem({ stock }) {
  const BuyModal = useState();
  let [showWatchlistAction, setShowWatchlistAction] = useState(false);

  let handleMouseEnter = () => {
    setShowWatchlistAction(true);
  };

  let handleMouseLeave = () => {
    setShowWatchlistAction(false);
  };
  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent mx-2">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price mx-2">{stock.price}</span>
        </div>
      </div>
      {showWatchlistAction && <WatchListAction uuid={stock.name} />}
    </li>
  );
}

const WatchListAction = ({ uuid }) => {
  const BuyContext = useContext(GeneralContext);
  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy(B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button
            className="buy"
            onClick={() => BuyContext.openBuyWindow(uuid)}
          >
            Buy
          </button>
        </Tooltip>
        <Tooltip
          title="Sell(S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics(A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
        <Tooltip
          title="Remove"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <Delete className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default WatchListItem;
