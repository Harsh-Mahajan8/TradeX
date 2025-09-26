import { NavLink, Link } from "react-router-dom";
import NavDrop from "./NavDrop.jsx";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white py-2 border-bottom sticky-top">
      <div className="container-fluid container ">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            className="w-6 h-6"
            src="/Navbar/cross-mark.png"
            alt="TradeX Logo"
          />
          <span className="fs-4 ps-2 bg-gradient-to-b from-indigo-500 to-pink-700 bg-clip-text text-transparent font-bold">
            TradeX
          </span>
        </Link>
        <button
          className="navbar-toggler border-0 bg-white"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <img
                className="w-6 h-6"
                src="/Navbar/cross-mark.png"
                alt="TradeX Logo"
              />
            </h5>
            <button
              type="button "
              className="btn-close me-2 bg-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body ps-3 p-1] font-[500]">
            <ul className="navbar-nav justify-content-end flex-grow-1 gap-3">
              <li className="nav-item navItems">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end
                  aria-current="page"
                  to="/signup"
                >
                  Signup
                </NavLink>
              </li>
              <li className="nav-item navItems">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item navItems">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end
                  to="/product"
                >
                  Product
                </NavLink>
              </li>
              <li className="nav-item navItems">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end
                  to="/pricing"
                >
                  Pricing
                </NavLink>
              </li>
              <li className="nav-item navItems">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  end
                  to="/support"
                >
                  Support
                </NavLink>
              </li>

              <li className="pt-[.81rem] dropDown">
                <NavDrop
                  title={<i className="fa-solid fa-bars text-[1.32rem]"></i>}
                >
                  <div className="row p-6 text-center mx-auto">
                    <div className="col-3">
                      <Link to="/login">
                        <img src="/Navdrop/kite-logo.svg" alt="kite" />
                        <header>Kite</header>
                        <p>Trading Platform</p>
                      </Link>
                    </div>
                    <div className="col-3">
                      <a href="#">
                        <img src="/Navdrop/console.svg" alt="" />
                        <header>Console</header>
                        <p>Backoffice</p>
                      </a>
                    </div>
                    <div className="col-3">
                      <a href="#">
                        <img src="/Navdrop/kite-connect.svg" alt="" />
                        <header>Kite Connect</header>
                        <p>Trading APIs</p>
                      </a>
                    </div>
                    <div className="col-3">
                      <a href="#">
                        <img src="/Navdrop/coin.svg" alt="" />
                        <header>Coin</header>
                        <p>Mutual funds</p>
                      </a>
                    </div>
                  </div>
                  <div className="row dropRow p-6">
                    <div className="col-auto ms-[1.4rem]">
                      <header>Utilities</header>
                      <ul>
                        <li><a href=""> Calculators</a></li>
                        <li><a href="">Brokerage calculator</a></li>
                        <li><a href="">Margin calculator</a></li>
                        <li><a href="">SIP calculator</a></li>
                      </ul>
                    </div>
                    <div className="col-3 ms-3">
                      <header>Updates</header>
                      <ul>
                        <li><a href=""> Z-Connect blog</a></li>
                        <li><a href="">Circulars / Bulletin</a></li>
                        <li><a href="">IPOs</a></li>
                        <li><a href="">Markets</a></li>
                      </ul>
                    </div>
                    <div className="col-auto">
                      <header>Education</header>
                      <img
                        className="w-9 ms-3 my-3"
                        src="/Navdrop/varsity.png"
                        alt="varsity"
                      />
                      <ul>
                        <li className="ms-1"><a href="">Varsity</a></li>
                      </ul>
                    </div>
                    <div className="col-auto pt-[1.82rem] ms-[5.6rem]">
                      <img
                        className="w-9 my-3 "
                        src="/Navdrop/tqna.png"
                        alt="tqna"
                      />
                      <ul>
                        <li className="-ms-3"><a href="">Trading Q&A</a></li>
                      </ul>
                    </div>
                  </div>
                </NavDrop>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
