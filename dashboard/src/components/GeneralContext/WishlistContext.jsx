import { createContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const WatchlistContext = createContext({
  handleRemove: () => {},
  addToWishList: () => {},
});

export const WatchlistContextProvider = ({ children }) => {
  const addToWishList = async (uuid) => {
    try {
      const res = await axios.put("http://localhost:3002/watchlist/add", {
        name: uuid,
      });
      const { message, status } = res.data;
      console.log(`${uuid} stock is saved on watchlist`);
      if (status === "success") {
        toast.success(message, {
          position: "bottom-right",
        });
      } else {
        toast.error(message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      toast.error("Something went wrong!", {
        position: "top-right",
      });
    }
  };
  const handleRemove = async (uuid) => {
    try {
      const res = await axios.delete("http://localhost:3002/watchlist/remove", {
        data: { name: uuid },
      });
      const { message, status } = res.data;
      console.log("removed", res);
      if (status === "success") {
        toast.success(message, {
          position: "bottom-right",
        });
      } else {
        toast.error(message, {
          position: "top-right",
        });
      }
      console.log(`${uuid} removed from watchlist`);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      toast.error("Something went wrong!", {
        position: "top-right",
      });
    }
  };

  return (
    <WatchlistContext.Provider value={{ handleRemove, addToWishList }}>
      {children}
      <ToastContainer/>
    </WatchlistContext.Provider>
  );
};
export default WatchlistContext;
