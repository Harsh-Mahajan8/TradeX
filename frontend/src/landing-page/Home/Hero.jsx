import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="container mb-[6rem]">
      <div className="row text-center col-10 mx-auto">
        <img src="Home/landing.png" alt="homeHero" className="mb-5 mx-auto" />
        <h2>Invest in everything</h2>
        <p className="text-xl">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more
        </p>
        <span>
          {" "}
          <Link to={"/signup"}>
            <button className="sign fs-5 py-[1rem] px-4 btn btn-primary my-2">
              Sign up for free
            </button>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Hero;
