import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext/GeneralContext";
import { WatchlistContextProvider } from "./GeneralContext/WishlistContext";
function Home() {
  return (
    <GeneralContextProvider>
      <WatchlistContextProvider>
        <TopBar />
        <Dashboard />
      </WatchlistContextProvider>
    </GeneralContextProvider>
  );
}

export default Home;
