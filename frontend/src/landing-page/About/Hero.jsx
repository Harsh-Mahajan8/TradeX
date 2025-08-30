function Hero() {
  return (
    <div className="continer mx-[5rem] text-[#424242] text-[1.02rem]">
      <div className="text-center py-[7rem]  border-b border-zinc-200">
        <h4>We pioneered the discount broking model in India.</h4>
        <h4 className="">Now, we are breaking ground with our technology.</h4>
      </div>
      <div className="row justify-content-center font-normal py-[5rem] leading-7">
        <div className="col-md-5">
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company TradeX,
            a combination of Zero and "Rodha", the Sanskrit word for barrier.{" "}
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>{" "}
          <p>
            Over 1.6+ crore clients place billions of orders every year through
            our powerful ecosystem of investment platforms, contributing over
            15% of all Indian retail trading volumes.
          </p>
        </div>
        <div className="col-md-5">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p>
            <a href="">Rainmatter</a>, our fintech fund and incubator, has
            invested in several fintech startups with the goal of growing the
            Indian capital markets.
          </p>
          <p>
            {" "}
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our <a href="">blog </a>or see what the media
            is <a href="">saying about us</a> or learn more about our business
            and product <a href="">philosophies.</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
