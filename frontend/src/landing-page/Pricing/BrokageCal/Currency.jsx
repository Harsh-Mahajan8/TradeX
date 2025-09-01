function Currency() {
  return (
    <div className="container">
      <div className="tab border mx-2 my-4 rounded border-zinc-400 text-sm">
        <div className="heading font-medium">
          <div className="row text-[#383838] border-b p-3 border-zinc-300 mx-1">
            <div className="col-2"></div>
            <div className="col-10">
              <div className="row ms-2 justify-between">
                <div className="col-6"> Currency futures</div>
                <div className="col-6"> Currency options</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 my-[2rem] ps-2">
          <div className="col-2 ps-3">Brokerage</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-5 ms-[2rem]">
                0.03% or ₹ 20/executed order whichever is lower
              </div>
              <div className="col-6 ">₹ 20/executed order</div>
            </div>
          </div>
        </div>

        <div className="row my-[2rem] ps-2">
          <div className="col-2 ps-3">STT/CTT</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-5 ms-[2rem]">No STT</div>
              <div className="col-6">No STT</div>
            </div>
          </div>
        </div>

        <div className="row my-[2rem] ps-2">
          <div className="col-2 ps-3">Transaction charges</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-5 ms-[2rem]">
                {" "}
                NSE: 0.00035% <br /> BSE: 0.00045%
              </div>
              <div className="col-6">
                {" "}
                NSE: 0.0311% <br /> BSE: 0.001%
              </div>
            </div>
          </div>
        </div>

        <div className="row my-[2rem] ps-2">
          <div className="col-2 ps-3">GST </div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-5 ms-[2rem]">
                18% on (brokerage + SEBI charges + transaction charges)
              </div>
              <div className="col-6">
                18% on (brokerage + SEBI charges + transaction charges)
              </div>
            </div>
          </div>
        </div>

        <div className="row my-[2rem] ps-2">
          <div className="col-2 ps-3">SEBI charges</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-5 ms-[2rem]">₹10 / crore</div>
              <div className="col-6">₹10 / crore</div>
            </div>
          </div>
        </div>

        <div className="row my-[2rem] ps-2">
          <div className="col-2 ps-3">Stamp charges</div>
          <div className="col-10">
            <div className="row justify-between">
              <div className="col-5 ms-[2rem]">
                {" "}
                0.0001% or ₹10 / crore on buy side
              </div>
              <div className="col-6"> 0.0001% or ₹10 / crore on buy side</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Currency;
