import OpenAcc from "../OpenAcc";
import DifferentAcc from "./DifferentAcc";
import ExploreInvestment from "./exploreInvestment";
import FAQs from "./FAQs";
import Hero from "./Hero";
import HeroSignUp from "./HeroSignUp";
import StepsToOpenAcc from "./StepsToOpenAcc";
import Benefits from "./Benefits";
function SignUpPage() {
  return (
    <>
      <Hero />
      <HeroSignUp />
      <ExploreInvestment />
      <StepsToOpenAcc />
      <Benefits />
      <DifferentAcc />
      <FAQs />
      <OpenAcc />
    </>
  );
}

export default SignUpPage;
