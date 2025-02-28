import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "../../page";

describe("Home Page", () => {
  it("renders the page title correctly", () => {
    render(<Page />);
    expect(screen.getByText("Blue Archive Tools")).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    render(<Page />);
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<Page />);
    expect(screen.getByText("Dialog Maker")).toBeInTheDocument();
    expect(screen.getByText("Momotalk generator")).toBeInTheDocument();
    expect(screen.getByText("Music Archive")).toBeInTheDocument();
  });

  it("has the correct number of feature cards", () => {
    render(<Page />);
    const cards = screen.getAllByRole("link");
    expect(cards.length).toBe(3);
  });

  it("has correct attributes for feature cards", () => {
    render(<Page />);
    const cards = screen.getAllByRole("link");

    expect(cards[0]).toHaveAttribute("href", "#");
    expect(cards[1]).toHaveAttribute("href", "#");
    expect(cards[2]).toHaveAttribute("href", "#");
  });
});
