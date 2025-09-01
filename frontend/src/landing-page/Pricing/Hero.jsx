function Hero() {
  return (
    <div className="container">
      <div className="top py-[6rem] text-center">
        <h4>Charges</h4>
        <h5 className="text-[#9a9a9a!important]">
          List of all charges and taxes
        </h5>
      </div>
      <div className="btm mt-[6rem] leading-7 text-center">
        <div className="row ">
          <div className="col-4 p-3">
            <img src="/Pricing/pricing-eq.svg" alt="" />
            <h3>Free equity delivery</h3>
            <p>
              All equity delivery investments (NSE, BSE), are absolutely free —
              ₹ 0 brokerage.
            </p>
          </div>
          <div className="col-4 p-3">
            <img src="/Pricing/other-trades.svg" alt="" />
            <h3>Intraday and F&O trades</h3>
            <p>
              Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
              intraday trades across equity, currency, and commodity trades.
              Flat ₹20 on all option trades.
            </p>
          </div>
          <div className="col-4 p-3">
            <img src="/Pricing/pricing-eq.svg" alt="" />
            <h3>Free direct MF</h3>
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
