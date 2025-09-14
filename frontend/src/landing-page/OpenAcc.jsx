import { Link } from "react-router-dom";
function OpenAcc() {
  return (
    <div className="container pt-[8rem] text-[#3d3d3d]">
      <div className="row col-10 text-center mx-auto">
        <h4>Open a TradeX account</h4>
        <p className="p-3">
          Modern platform and apps,₹0 invesrtments, and flat ₹20 intraday and
          F&O trades.{" "}
        </p>
        <span>
          <Link to="/signup" className="sign fs-5 py-[1rem] px-4 btn btn-primary my-1">
            Sign up for free
          </Link>
        </span>
      </div>
    </div>
  );
}

export default OpenAcc;
