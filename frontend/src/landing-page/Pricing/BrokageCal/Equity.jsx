function Equity() {
  return (
    <div className="container">
      <div className="tab border my-4 rounded border-zinc-400 text-sm">
        <div className="heading font-medium">
          <div className="row text-[#383838] border-b p-3 border-zinc-300 mx-1">
            <div className="col-1 ml-5"></div>
            <div className="col-10">
              <div className="row justify-between">
                <div className="col-2">Equity delivery</div>
                <div className="col-2">Equity intraday</div>
                <div className="col-2">F&O - Futures</div>
                <div className="col-2">F&O - Options</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3 ps-2">
          <div className="col-1 mr-5 my-auto ml-2">Brokerage</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-3 my-auto pe-4">Zero Brokerage 0</div>
              <div className="col-3 my-auto pe-4">
                .03% or Rs. 20/executed order whichever is lower
              </div>
              <div className="col-3 my-auto pe-4">
                0.03% or Rs. 20/executed order whichever is lower
              </div>
              <div className="col-3 my-auto pl-3">
                Flat Rs. 20 per executed order
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-8 ps-2">
          <div className="col-1 my-auto mr-5 ml-2">STT/CTT</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-3 my-auto pe-4">0.1% on buy & sell</div>
              <div className="col-3 my-auto pe-4">0.025% on the sell side</div>
              <div className="col-3 my-auto pe-4">0.02% on the sell side</div>
              <div className="col-3">
                <ul>
                  <li>
                    0.125% of the intrinsic value on options that are bought and
                    exercised
                  </li>
                  <li>0.1% on sell side (on premium)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-8 ps-2">
          <div className="col-1 my-auto mr-5 ml-2">Transaction charges</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-3 my-auto pe-4">
                {" "}
                NSE: 0.00297% BSE: 0.00375%
              </div>
              <div className="col-3 my-auto pe-4">
                {" "}
                NSE: 0.00297% BSE: 0.00375%{" "}
              </div>
              <div className="col-3 my-auto pe-4">NSE: 0.00173% BSE: 0 </div>
              <div className="col-3">
                NSE: 0.03503% (on premium) BSE: 0.0325% (on premium)
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-8 ps-2">
          <div className="col-1 my-auto mr-5 ml-2">GST</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-3 my-auto pe-4">
                18% on (brokerage + SEBI charges + transaction charges)
              </div>
              <div className="col-3 my-auto pe-4">
                18% on (brokerage + SEBI charges + transaction charges)
              </div>
              <div className="col-3 my-auto pe-4">
                18% on (brokerage + SEBI charges + transaction charges)
              </div>
              <div className="col-3">
                18% on (brokerage + SEBI charges + transaction charges)
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-8 ps-2">
          <div className="col-auto my-auto ml-2">SEBI charges</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-3 my-auto pe-4">₹10 / crore</div>
              <div className="col-3 my-auto pe-4">₹10 / crore</div>
              <div className="col-3 my-auto pe-4">₹10 / crore</div>
              <div className="col-3">₹10 / crore</div>
            </div>
          </div>
        </div>
        <div className="row pt-8 pb-4 ps-2">
          <div className="col-1 my-auto mr-5 ml-2">Stamp charges</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-3 my-auto pe-4">
                {" "}
                0.015% or ₹1500 / crore on buy side 0.
              </div>
              <div className="col-3 my-auto pe-4">
                003% or ₹300 / crore on buy side
              </div>
              <div className="col-3 my-auto pe-4">
                {" "}
                0.002% or ₹200 / crore on buy side 0.
              </div>
              <div className="col-3">0.003% or ₹300 / crore on buy side</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equity;
