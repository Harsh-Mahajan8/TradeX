import { useState } from "react";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import axios from "axios";

function StockListItem({ stock, onAddToWatchlist }) {
  let [showWatchlistAction, setShowWatchlistAction] = useState(false);

  let handleMouseEnter = () => {
    setShowWatchlistAction(true);
  };

  let handleMouseLeave = () => {
    setShowWatchlistAction(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
      {showWatchlistAction && (
        <WatchListAction
          uuid={stock.name}
          onAddToWatchlist={onAddToWatchlist}
        />
      )}
    </li>
  );
}

const WatchListAction = ({ uuid, onAddToWatchlist }) => {
  const BuyContext = useContext(GeneralContext);

  const addToWishList = async () => {
    try {
      await axios.post("http://localhost:3002/addtowatchList", { name: uuid });
      console.log(`${uuid} stock is saved on watchlist`);
      // Refresh the watchlist data
      if (onAddToWatchlist) {
        onAddToWatchlist();
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
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

        <Tooltip
          title="Add to WishList"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={addToWishList}>
            <AddIcon className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default StockListItem;
