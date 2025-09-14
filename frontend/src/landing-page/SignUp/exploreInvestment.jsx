function ExploreInvestment() {
  return (
    <div className="container my-[6rem] md:px-[6rem!important]">
      <h4 className="text-center">
        Investment options with Zerodha demat account
      </h4>
      <div className="row my-5  ps-[3rem!important] ">
        <div className="col-md row">
          <div className="col-4">
            <img src="/Signup/stocks-acop.svg" alt="" />
          </div>
          <div className="col-6">
            <h5>Stock</h5>
            <p className="text-[#5f5f5f!important]">
              Invest in all exchange-listed securities
            </p>
          </div>
        </div>
        <div className="col-md row">
          <div className="col-4">
            <img src="/Signup/mf-acop.svg" alt="" />
          </div>
          <div className="col-6">
            <h5>Mutual funds</h5>
            <p className="text-[#5f5f5f!important]">
              Invest in commission-free direct mutual funds
            </p>
          </div>
        </div>
      </div>
      <div className="row  ps-[3rem!important] ">
        {" "}
        <div className="col-md row">
          <div className="col-4">
            <img src="/Signup/ipo-acop.svg" alt="" />
          </div>
          <div className="col-6">
            <h5>IPO</h5>
            <p className="text-[#5f5f5f!important]">
              Apply to the latest IPOs instantly via UPI
            </p>
          </div>
        </div>
        <div className="col-md row">
          <div className="col-4">
            <img src="/Signup/fo-acop.svg" alt="" />
          </div>
          <div className="col-6">
            <h5>Futures & options</h5>
            <p className="text-[#5f5f5f!important]">
              Hedge and mitigate market risk through simplified F&O trading
            </p>
          </div>
        </div>
      </div>
      <div className="text-center my-5">
        <button className="px-[1.8rem] py-2 fs-5 rounded text-white font-medium bg-[#387ed1]">
          Explore Investments
        </button>
      </div>
    </div>
  );
}

export default ExploreInvestment;
