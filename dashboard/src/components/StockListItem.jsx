import { useState } from "react";
import { useContext } from "react";
import GeneralContext from "./GeneralContext/GeneralContext";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import WatchlistContext from "./GeneralContext/WishlistContext";

function StockListItem({ stock, handleGraph }) {
  let [showWatchlistAction, setShowWatchlistAction] = useState(false);

  let handleMouseEnter = () => {
    setShowWatchlistAction(true);
  };

  let handleMouseLeave = () => {
    setShowWatchlistAction(false);
  };
  const BuyContext = useContext(GeneralContext);

  return (
    <li
      className={` ${
        BuyContext.selectedStock == stock.name ? "bg-gray-200" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`item ${stock.percent < 0 ? "down" : "up"}`}>
        <p>{stock.name}</p>
        <div className="itemInfo">
          <span className={`percent mx-2 ${stock.percent < 0 ? "down" : "up"}`}>
            {stock.percent > 0 ? "+" : ""}
            {stock.percent}
          </span>
          {stock.percent < 0 ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price mx-2">₹ {stock.price}</span>
        </div>
      </div>
      {showWatchlistAction && <WatchListAction uuid={stock.name} handleGraphClick = {handleGraph} />}
    </li>
  );
}

const WatchListAction = ({ uuid, handleGraphClick }) => {
  const BuyContext = useContext(GeneralContext);
  const { addToWishList } = useContext(WatchlistContext);

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
          <button className="action" onClick={handleGraphClick}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip
          title="Add to WishList"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={() => addToWishList(uuid)}>
            <AddIcon className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default StockListItem;
