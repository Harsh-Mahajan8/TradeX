function DifferentAcc() {
  return (
    <div className="container">
      <h4 className="text-center">Explore different account types</h4>
      <div className="tabel mt-5 ">
        <div className="row justify-evenly justify-content-center">
          <div className="col-md px-4 py-2 m-3 border border-gray-300 rounded">
            <img
              className="bg-blue-50 rounded-[50%] p-1 relative right-10 top-5"
              src="/Signup/acop-individual.svg"
              alt=""
            />
            <h5 className="pb-3">Individual Account</h5>
            <p className="text-[#5f5f5f!important]">
              Invest in equity, mutual funds and derivatives
            </p>
          </div>
          <div className="col-md px-4 py-2 m-3 border border-gray-300 rounded">
            <img
              className="bg-blue-50 rounded-[50%] p-1 relative right-10 top-5"
              src="/Signup/acop-huf.svg"
              alt=""
            />
            <h5 className="pb-3">HUF Account</h5>
            <p className="text-[#5f5f5f!important]">
              Make tax-efficient investments for your family
            </p>
          </div>
          <div className="col-md px-4 py-2 m-3 border border-gray-300 rounded">
            <img
              className="bg-blue-50 rounded-[50%] p-1 relative right-10 top-5"
              src="/Signup/acop-nri.svg"
              alt=""
            />
            <h5 className="pb-3">NRI Account</h5>
            <p className="text-[#5f5f5f!important]">
              Invest in equity, mutual funds, debentures, and more
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md px-4 py-2 m-3 border border-gray-300 rounded">
            <img
              className="bg-blue-50 rounded-[50%] p-1 relative right-10 top-5"
              src="/Signup/acop-minor.svg"
              alt=""
            />
            <h5 className="pb-3">Minor Account</h5>
            <p className="text-[#5f5f5f!important]">
              Teach your little ones about money & invest for their future with
              them
            </p>
          </div>
          <div className="col-md px-4 py-2 m-3 border border-gray-300 rounded">
            <img
              className="bg-blue-50 rounded-[50%] p-1 relative right-10 top-5"
              src="/Signup/acop-corporate.svg"
              alt=""
            />
            <h5 className="pb-3">Corporate / LLP/ Partnership</h5>
            <p className="text-[#5f5f5f!important]">
              Manage your business surplus and investments easily
            </p>
          </div>
          <div className="col-md p-4 m-3 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default DifferentAcc;
