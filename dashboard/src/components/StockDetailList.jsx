import { useState, useEffect, useRef } from "react";
import { Pagination } from "@mui/material";
import WatchListItem from "./WatchListItem";
import axios from "axios";
import StockListItem from "./StockListItem";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const StockDetailList = () => {
  const [watchListData, setWatchListData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const searchQuery = useRef();

  useEffect(() => {
    axios.get("http://localhost:3002/load/watchlist").then((res) => {
      setWatchListData(res.data || []);
    });
    axios.get("http://localhost:3002/load/stocks").then((res) => {
      setStockData(res.data || []);
    });
  }, []);

  const [selectWatchList, setSelectWatchList] = useState(false);
  const stockList = selectWatchList ? watchListData : stockData;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(stockList.length / itemsPerPage));

  // Calculate the range of items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Use search results if available, otherwise use paginated data
  const currentPageData = searchResults
    ? [searchResults]
    : stockList.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setSearchResults(null); // Clear search when changing pages
  };

  const handleWatchList = () => {
    setSelectWatchList((pre) => !pre);
    setSearchResults(null); // Clear search when switching lists
    console.log("Watch List opened!!");
  };

  const handleSearch = async () => {
    const query = searchQuery.current.value;
    if (query.trim() === "") {
      setSearchResults(null);
      return;
    }

    const result = stockList.find(
      (stock) =>
        stock.name && stock.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(result || null);
    console.log("Search query:", query);
  };

  return (
    <div
      className="watchlist-container h-auto mt-1"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="search-container text-zinc-700">
        <input
          type="text"
          ref={searchQuery}
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <button
          className="hover:cursor-pointer text-gray-500"
          onClick={handleSearch}
        >
          <SearchIcon />
        </button>
        <span className="counts">
          {searchResults
            ? `1 of ${stockList.length}`
            : `${startIndex + 1}-${Math.min(endIndex, stockList.length)} of ${
                stockList.length
              }`}
        </span>
      </div>

      <ul className="list" style={{ flex: 1, overflowY: "auto" }}>
        {currentPageData.length === 0 && !searchResults && (
          <div className="no-orders">
            <p>Your watchList is empty!!</p>
            <button className="btn" onClick={handleWatchList}>
              Get started
            </button>
          </div>
        )}

        {searchResults && !searchResults.name && (
          <div className="no-orders">
            <p>No results found for your search!</p>
          </div>
        )}

        {currentPageData.map((stock, index) => {
          return (
            <div key={`${stock.name}-${index}`}>
              {selectWatchList && <WatchListItem stock={stock} />}
              {!selectWatchList && <StockListItem stock={stock} />}
            </div>
          );
        })}
      </ul>

      <div className="pagination-container">
        <Tooltip
          title={`${selectWatchList ? "Close WatchList" : "Open WatchList"}`}
          placement="right"
          arrow
        >
          <button
            className={`watchBtn ${selectWatchList ? "watchBtnClicked" : ""}`}
            onClick={handleWatchList}
          >
            WatchList
          </button>
        </Tooltip>

        {!searchResults && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            size="small"
          />
        )}
      </div>
    </div>
  );
};

export default StockDetailList;
