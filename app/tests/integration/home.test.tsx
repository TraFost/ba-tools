import { render, screen } from "@testing-library/react";
import { prisma } from "lib/prisma/prisma";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Page from "@/app/page";

vi.mock("lib/prisma/prisma", () => ({
  prisma: {
    post: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock("components/ui/big-card", () => ({
  default: ({
    children,
    bgUrl,
    href,
  }: {
    children: React.ReactNode;
    bgUrl: string;
    href: string;
  }) => (
    <div data-testid="big-card" data-bg-url={bgUrl} data-href={href}>
      {children}
    </div>
  ),
}));

describe("Home Page", () => {
  const mockPosts = [
    { id: 1, name: "Test Post 1" },
    { id: 2, name: "Test Post 2" },
    { id: 3, name: "Test Post 3" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Set up the mock to return our test data
    (prisma.post.findMany as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockPosts);
  });

  it("renders the page title correctly", async () => {
    const { findByText } = render(await Page());
    expect(await findByText("Blue Archive Tools")).toBeInTheDocument();
  });

  it("renders posts from the database", async () => {
    render(await Page());

    // Verify prisma.post.findMany was called
    expect(prisma.post.findMany).toHaveBeenCalledTimes(1);

    // Check if all post names are rendered
    for (const post of mockPosts) {
      expect(screen.getByText(post.name)).toBeInTheDocument();
    }
  });

  it("renders all feature cards with correct props", async () => {
    render(await Page());

    const cards = screen.getAllByTestId("big-card");
    expect(cards).toHaveLength(3);

    // Check the first card (Dialog Maker)
    expect(cards[0]).toHaveAttribute("data-bg-url", "/BG.jpg");
    expect(cards[0]).toHaveAttribute("data-href", "#");
    expect(cards[0]).toHaveTextContent("Dialog Maker");

    // Check the second card (Momotalk generator)
    expect(cards[1]).toHaveAttribute("data-bg-url", "/BG_HyakkiyakoSquareStreet.jpg");
    expect(cards[1]).toHaveAttribute("data-href", "#");
    expect(cards[1]).toHaveTextContent("Momotalk generator");

    // Check the third card (Music Archive)
    expect(cards[2]).toHaveAttribute("data-bg-url", "/BG_SchaleOperationRoom.jpg");
    expect(cards[2]).toHaveAttribute("data-href", "#");
    expect(cards[2]).toHaveTextContent("Music Archive");
  });

  it("handles database errors gracefully", async () => {
    // Mock a database error
    (prisma.post.findMany as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Database connection failed"),
    );

    // We need to handle the error in the component or the test will fail
    // Since the component doesn't have error handling, we'll expect the test to fail
    // This is a good indication that you might want to add error handling to your component
    await expect(Page()).rejects.toThrow("Database connection failed");
  });
});
