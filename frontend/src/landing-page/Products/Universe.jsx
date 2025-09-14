import { Link } from "react-router-dom";
function Universe() {
  return (
    <div className="container text-center mt-5 p-5 pb-2">
      <h3>The TradeX Universe</h3>
      <p className="my-4">
        Extend your trading and investment experience even further with our
        partner platforms
      </p>
      <div className="row justify-content-center  text-[#cacaca]">
        <div className="col-3 box">
          <a href="#">
            <img src="/Products/TradeXfundhouse.png" alt="" />
            <p>
              Our asset management venture that is creating simple and
              transparent index funds to help you save for your goals.
            </p>
          </a>{" "}
        </div>
        <div className="col-3 box">
          <a href="#">
            <img src="/Products/sensibull-logo.svg" alt="" />
            <p>
              Options trading platform that lets you create strategies, analyze
              positions, and examine data points like open interest, FII/DII,
              and more.
            </p>
          </a>
        </div>
        <div className="col-3 box">
          <a href="#">
            <img src="/Products/tijori.svg" alt="" />
            <p>
              Investment research platform that offers detailed insights on
              stocks, sectors, supply chains, and more.
            </p>
          </a>{" "}
        </div>
      </div>
      <div className="pb-[4rem] row justify-content-center">
        <div className="col-3 box">
          <a href="#">
            <img src="/Products/streak-logo.png" alt="" />
            <p>
              Systematic trading platform that allows you to create and backtest
              strategies without coding.
            </p>
          </a>{" "}
        </div>
        <div className="col-3 box">
          <a href="#">
            <img src="/Products/smallcase-logo.png" alt="" />
            <p>
              Thematic investing platform that helps you invest in diversified
              baskets of stocks on ETFs.
            </p>
          </a>{" "}
        </div>
        <div className="col-3 box">
          <a href="#">
            <img src="/Products/ditto-logo.png" alt="" />
            <p>
              Personalized advice on life and health insurance. No spam and no
              mis-selling. Sign up for free
            </p>
          </a>{" "}
        </div>
      </div>
      <Link to="/signup">
        <button className="sign fs-5 pt-[1rem] px-4 btn bg-[#387ed1!important] hover:bg-[#000!important] text-[#fff!important] mt-1 ">
          Sign up for free
        </button>
      </Link>
    </div>
  );
}

export default Universe;
