import OpenAcc from "../OpenAcc";
import DifferentAcc from "./DifferentAcc";
import ExploreInvestment from "./exploreInvestment";
import FAQs from "./FAQs";
import Hero from "./Hero";
import StepsToOpenAcc from "./StepsToOpenAcc";

function SignUpPage() {
  return (
    <>
      <Hero />
      <ExploreInvestment />
      <StepsToOpenAcc />
      <DifferentAcc />
      <FAQs />
      <OpenAcc />
    </>
  );
}

export default SignUpPage;
