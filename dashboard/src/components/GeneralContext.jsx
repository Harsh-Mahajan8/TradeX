import { Children, createContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindow, setIsBuyWindow] = useState(false);
  const [selectedStockUid, setselectedStockUid] = useState("");

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindow(true);
    setselectedStockUid(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindow(false);
    setselectedStockUid("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {children}
      {isBuyWindow && <BuyActionWindow uid={selectedStockUid} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
