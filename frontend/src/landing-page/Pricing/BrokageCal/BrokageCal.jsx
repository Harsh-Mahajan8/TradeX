import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function BrokageCal() {
  return (
    <>
      <Nav />
      <Outlet />
      <h5 className="text-center pt-2 my-3">
        <a href="">Calculate your costs upfront</a> using our brokerage
        calculator
      </h5>
    </>
  );
}

export default BrokageCal;
