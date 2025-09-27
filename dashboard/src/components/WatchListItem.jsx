import { useState } from "react";
import { useContext } from "react";
import GeneralContext from "./GeneralContext/GeneralContext";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
  Delete,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import WatchlistContext from "./GeneralContext/WishlistContext";

function WatchListItem({ stock, handleGraph }) {
  const BuyContext = useContext(GeneralContext);

  let [showWatchlistAction, setShowWatchlistAction] = useState(false);
  let handleMouseEnter = () => {
    setShowWatchlistAction(true);
  };

  let handleMouseLeave = () => {
    setShowWatchlistAction(false);
  };

  return (
    <li
      className={` ${
        BuyContext.selectedStock == stock.name ? "bg-gray-100" : "bg-gray-700"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`item ${stock.percent < 0 ? "down" : "up"}`}>
        <p>{stock.name}</p>
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
      {showWatchlistAction && <WatchListAction uuid={stock.name} handleGraphClick = {handleGraph}/>}
    </li>
  );
}

const WatchListAction = ({ uuid, handleGraphClick }) => {
  const { handleRemove } = useContext(WatchlistContext);
  const { openBuyWindow, openSellWindow} =
    useContext(GeneralContext);

  // Refresh the watchlist data
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
            onClick={() => {
              openBuyWindow(uuid);
            }}
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
            onClick={() => {
              openSellWindow(uuid);
            }}
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
          <button className="action" onClick={handleGraphClick}>
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
          <button
            className="action"
            onClick={() => {
              handleRemove(uuid);
     
            }}
          >
            <Delete className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default WatchListItem;
