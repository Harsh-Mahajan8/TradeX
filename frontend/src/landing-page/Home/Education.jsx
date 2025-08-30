function Education() {
  return (
    <div className="conatiner">
      <div className="row pt-[3rem] px-[3rem]">
        <div className="col-md-5 md:ms-[4rem] mx-4 px-5 ">
          <img src="/Home/index-education.svg" alt="" />
        </div>
        <div className="col-md-6 px-5 pt-[2.4rem]">
          <h3>Free and open market education</h3>
          <p className="mt-4">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.{" "}
          </p>
          <a href="" className="my-3">
            Varsity <i className="fa-solid fa-arrow-right"></i>
          </a>
          <p className="mt-4">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.{" "}
          </p>
          <a href="" className="my-3">
            TradingQ&A <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
