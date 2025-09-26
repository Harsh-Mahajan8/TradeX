import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext/GeneralContext";
import { WatchlistContextProvider } from "./GeneralContext/WishlistContext";
import { ToastContainer } from "react-toastify";
function Home() {
  return (
    <GeneralContextProvider>
      <WatchlistContextProvider>
        <TopBar />
        <Dashboard />
        <ToastContainer/>
      </WatchlistContextProvider>
    </GeneralContextProvider>
  );
}

export default Home;
