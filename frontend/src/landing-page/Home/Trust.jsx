function Trust() {
  return (
    <div className="container pt-[2.33rem]">
      <div className="row px-[3rem] my-4 ">
        <div className="data col-11 mx-auto col-md-5 mt-2">
          <h3 className="mb-3">Trust with confidence</h3>

          <h4 className="mt-5">Customer-first always</h4>
          <p>
            That's why 1.6+ crore customers trust TradeX with ~ ₹6 lakh crores
            of equity investments, making us India’s largest broker;
            contributing to 15% of daily retail exchange volumes in India.
          </p>
          <h4 className="mt-4">No spam or gimmicks</h4>
          <p>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like. Our
            philosophies.
          </p>
          <h4 className="mt-4">The TradeX universe</h4>
          <p>
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h4 className="mt-4">Do better with money</h4>
          <p>
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="img col-md-7 text-center">
          <div className="row">
            <img className="p-3" src="/Home/ecosystem.png" alt="" />
          </div>
          <div className="row mt-3">
            <div className="col-7">
              <a href="">
                Explore our product <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <div className="col-4">
              <a href="">
                Try Kite demo<i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <img
          className="col-md-8 py-[3rem] mx-auto"
          src="Home/press-logos.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Trust;
