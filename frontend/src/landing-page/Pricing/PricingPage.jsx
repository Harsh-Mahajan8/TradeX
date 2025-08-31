import BrokageCal from "./BrokageCal/BrokageCal";
import Hero from "./Hero";
import ChargesBox from "./ChargesBoxes/ChargesBox";
import ChargesDetail from "./ChargesDetail";

function PricingPage() {
  return (
    <>
      <Hero/>
      <BrokageCal/>
      <ChargesBox />
      <ChargesDetail />
    </>
  );
}

export default PricingPage;
