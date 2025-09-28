import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Hero from "../src/landing-page/Home/Hero";

describe("Hero component", () => {
  test("renders hero component", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const heroImg = screen.getByAltText("homeHero");
    expect(heroImg).toBeInTheDocument();
    expect(heroImg.src).toContain("landing.png");
  });
});
