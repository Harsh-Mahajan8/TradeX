import { createContext, useEffect, useState } from "react";
import BuyActionWindow from "../BuyActionWindow";
import SellActionWindow from "../SellActionWindow";
import axios from "axios";
axios.defaults.withCredentials = true;

import { toast } from "react-toastify";
const GeneralContext = createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},
  closeSellWindow: () => {},
  buyStock: () => {},
  sellStock: () => {},
  orders: [],
  holdings: [],
  positions: [],
  userData: {},
  refreshHoldings: () => {},
  refreshPositions: () => {},
  refreshOrders: () => {},
  watchList: [],
  refreshWatchList: () => {},
  selectedStock: "",
  handleLogout: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [openWindow, setOpenWindow] = useState({
    buy: false,
    sell: false,
  });
  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [userData, setUserData] = useState({});

  const refreshUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3002/load/userdata");
      if (res.data && res.data.username) {
        setUserData(res.data);
      } else {
        setUserData("");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserData("");
      window.location.href = "http://localhost:5174/login";
    }
  };

  const refreshOrders = async () => {
    try {
      // const res = await axios.get("http://localhost:3002/load/orders");
      // if (res.data) {
      //   setOrders(res.data);
      // }
      setOrders(userData.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const refreshHoldings = async () => {
    try {
      // const res = await axios.get("http://localhost:3002/load/holdings");
      // if (res.data) {
      //   setHoldings(res.data);
      // }
      setHoldings(userData.holdings || []);
    } catch (error) {
      console.error("Error fetching holdings:", error);
    }
  };

  const refreshPositions = async () => {
    try {
      // const res = await axios.get("http://localhost:3002/load/positions");
      // if (res.data) {
      //   setPositions(res.data);
      // }
      setPositions(userData.positions || []);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const refreshWatchList = async () => {
    try {
      // const res = await axios.get("http://localhost:3002/load/watchlist");
      // if (res.data) {
      //   setWatchList(res.data);
      // }
      setWatchList(userData.watchlist || []);
    } catch (error) {
      console.error("Error fetching holdings:", error);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  useEffect(() => {
    setOrders(userData.orders || []);
    setHoldings(userData.holdings || []);
    setPositions(userData.positions || []);
    setWatchList(userData.watchlist || []);
  }, [userData]);

  const [selectedStockUid, setselectedStockUid] = useState("");

  const handleOpenBuyWindow = (uid) => {
    setOpenWindow({ buy: true, sell: false });
    setselectedStockUid(uid);
  };
  const handleOpenSellWindow = (uid) => {
    setOpenWindow({ buy: false, sell: true });
    setselectedStockUid(uid);
  };

  const handleCloseBuyWindow = () => {
    setOpenWindow((prev) => ({ ...prev, buy: false }));
    setselectedStockUid("");
  };
  const handleCloseSellWindow = () => {
    setOpenWindow((prev) => ({ ...prev, sell: false }));
    setselectedStockUid("");
  };

  //Buy-sell stock functions
  const handleBuyClick = async (data) => {
    try {
      const res = await axios.post("http://localhost:3002/order/buy", data);
      const { msg, status } = res.data;
      console.log("bought", res);
      if (status === "success") {
        toast.success(msg, {
          position: "top-right",
        });
      } else {
        toast.error(msg, {
          position: "top-right",
        });
      }
      // await refreshOrders();
      // await refreshHoldings();
      // await refreshPositions();
      await refreshUserData();
    } catch (err) {
      console.error("Buy order error:", err);
      toast.error("Something went wrong!", {
        position: "top-right",
      });
    }
  };

  const handleSellClick = async (data) => {
    try {
      const res = await axios.post("http://localhost:3002/order/sell", data);
      const { msg, status } = res.data;
      console.log("sold", res);
      if (status === "success") {
        toast.success(msg, {
          position: "top-right",
        });
      } else {
        toast.error(msg, {
          position: "top-right",
        });
      }
      // await refreshOrders();
      // await refreshHoldings();
      // await refreshPositions();
      await refreshUserData();
    } catch (err) {
      console.error("Sell order error:", err);
      toast.error("Something went wrong!", {
        position: "top-right",
      });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3002/user/logout");
      const { message } = res.data;
      console.log("Logged out", res);

      setUserData({});
      // Clear any cached data
      setOrders([]);
      setHoldings([]);
      setPositions([]);
      setWatchList([]);
      // Navigate to login page
      window.location.href = "http://localhost:5174/login";
      toast.success(message, {
        position: "top-right",
      });
    } catch (err) {
      console.error("Failed to log out", err);
      toast.error("Failed to logout", {
        position: "top-right",
      });
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        buyStock: handleBuyClick,
        sellStock: handleSellClick,
        selectedStock: selectedStockUid,
        orders,
        holdings,
        positions,
        refreshHoldings,
        refreshPositions,
        refreshOrders,
        watchList,
        refreshWatchList,
        userData,
        refreshUserData,
        handleLogout,
      }}
    >
      {children}

      {openWindow.buy && <BuyActionWindow uid={selectedStockUid} />}
      {openWindow.sell && <SellActionWindow uid={selectedStockUid} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
