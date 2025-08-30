import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./landing-page/Home/HomePage";
import SignUpPage from "./landing-page/SignUp/SignUpPage";
import AboutPage from "./landing-page/About/AboutPage";
import ProductPage from "./landing-page/Products/ProductPage";
import SupportPage from "./landing-page/Support/SupportPage";
import PricingPage from "./landing-page/Pricing/PricingPage";
import Navbar from "./landing-page/Navbar";
import Footer from "./landing-page/Footer";
import NotFound from "./landing-page/NotFound";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element = {<NotFound/>}/>
    </Routes>
    <Footer />
  </BrowserRouter>
);
