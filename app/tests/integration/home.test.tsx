import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "@/app/page";

describe("Page component", () => {
  it("renders the expected text", async () => {
    render(<Page />);
    const textElement = await screen.findByText("Blue archive tools here");

    expect(textElement).toBeInTheDocument();
  });
});
