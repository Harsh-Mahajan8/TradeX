import { createContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},
  closeSellWindow: () => {},
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

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {children}
      {openWindow.buy && <BuyActionWindow uid={selectedStockUid} />}
      {openWindow.sell && <SellActionWindow uid={selectedStockUid} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
