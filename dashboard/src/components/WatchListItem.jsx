import { useState } from "react";
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
import axios from "axios";

function WatchListItem({ stock, onRemoveFromWatchlist }) {
  let [showWatchlistAction, setShowWatchlistAction] = useState(false);
  let handleMouseEnter = () => {
    setShowWatchlistAction(true);
  };

  let handleMouseLeave = () => {
    setShowWatchlistAction(false);
  };
  return (
    <li
      className="bg-gray-700 font-bold"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`item ${stock.percent < 0 ? "down" : "up"}`}>
        <p className={stock.percent < 0 ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className={`percent mx-2 ${stock.percent < 0 ? "down" : "up"}`}>
            {stock.percent > 0 ? "+" : ""}
            {stock.percent}%
          </span>
          {stock.percent < 0 ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price mx-2">₹ {stock.price}</span>
        </div>
      </div>
      {showWatchlistAction && (
        <WatchListAction
          uuid={stock.name}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
        />
      )}
    </li>
  );
}

const WatchListAction = ({ uuid, onRemoveFromWatchlist }) => {
  const BuyContext = useContext(GeneralContext);
  const handleRemove = async () => {
    try {
      await axios.put("http://localhost:3002/removefromwatchlist", {
        name: uuid,
      });
      console.log(`${uuid} removed from watchlist`);
      // Refresh the watchlist data
      if (onRemoveFromWatchlist) {
        onRemoveFromWatchlist();
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };
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
            B
          </button>
        </Tooltip>
        <Tooltip
          title="Sell(S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button
            className="sell"
            onClick={() => BuyContext.openSellWindow(uuid)}
          >
            S
          </button>
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
          <button className="action" onClick={handleRemove}>
            <Delete className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default WatchListItem;
