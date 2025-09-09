import { watchlists } from "../Data/data";
import WatchListItem from './WatchListItem';

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container text-zinc-700">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search" 
        />
        <span className="counts"> {watchlists.length} / 50</span>
      </div>

      <ul className="list">
        {watchlists.map((stock) => {
          return(
            <WatchListItem stock={stock} key={stock.name} />
          )
        })}
      </ul>
    </div>
  );
};

export default WatchList;
