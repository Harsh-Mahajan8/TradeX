import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Outlet } from "react-router-dom";
import "./index.css";
import HomePage from "./landing-page/Home/HomePage";
import SignUpPage from "./landing-page/SignUp/SignUpPage";
import AboutPage from "./landing-page/About/AboutPage";
import ProductPage from "./landing-page/Products/ProductPage";
import SupportPage from "./landing-page/Support/SupportPage";
import PricingPage from "./landing-page/Pricing/PricingPage";
import Navbar from "./landing-page/Navbar/Navbar";
import Footer from "./landing-page/Footer";
import NotFound from "./landing-page/NotFound";
import Equity from "./landing-page/Pricing/BrokageCal/Equity";
import Commodity from "./landing-page/Pricing/BrokageCal/Commodity";
import Currency from "./landing-page/Pricing/BrokageCal/Currency";
import LoginPage from "./landing-page/LoginPage";
const DefaultRoute = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<DefaultRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />}>
          <Route path="equity" element={<Equity />} />
          <Route path="currency" element={<Currency />} />
          <Route path="commodity" element={<Commodity />} />
        </Route>
        <Route path="/support" element={<SupportPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);
