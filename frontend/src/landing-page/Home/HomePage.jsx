import Footer from "../Footer";
import Navbar from "../Navbar";
import OpenAcc from "../OpenAcc";
import Hero from "./Hero";
import Pricing from "./Pricing";
import Trust from "./Trust";
function HomePage() {
  return (
    <> 
      <Navbar />
      <Hero />
      <Trust />
      <Pricing />
      <OpenAcc />
      <Footer />
    </>
  );
}

export default HomePage;
