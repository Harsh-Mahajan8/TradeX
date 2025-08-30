import BrokageCal from "./BrokageCal";
import Charges from "./Charges";
import ChargesBox from "./ChargesBox";
import ChargesDetail from "./ChargesDetail";

function PricingPage() {
  return (
    <>
      <Charges />
      <BrokageCal />
      <ChargesBox />
      <ChargesDetail />
    </>
  );
}

export default PricingPage;
