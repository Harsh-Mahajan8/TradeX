import { createContext, useState } from "react";
import BuyActionWindow from "../BuyActionWindow";
import SellActionWindow from "../SellActionWindow";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const GeneralContext = createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},
  closeSellWindow: () => {},
  buyStock: () => {},
  sellStock: () => {},
  orderData: "",
  selectedStock: "",
});

export const GeneralContextProvider = ({ children }) => {
  const [openWindow, setOpenWindow] = useState({
    buy: false,
    sell: false,
  });

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
    } catch (err) {
      console.error("Sell order error:", err);
      toast.error("Something went wrong!", {
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
      }}
    >
      {children}
      {openWindow.buy && <BuyActionWindow uid={selectedStockUid} />}
      {openWindow.sell && <SellActionWindow uid={selectedStockUid} />}
      <ToastContainer />
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
