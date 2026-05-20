import { render, screen } from "@testing-library/react";
import { SearchStatus } from "./SearchStatus";

describe("SearchStatus", () => {
  it("renders idle message", () => {
    render(<SearchStatus status="idle" />);
    expect(screen.getByText("Search GitHub users")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<SearchStatus status="error" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders rate-limited message", () => {
    render(<SearchStatus status="rate-limited" />);
    expect(screen.getByText("Rate limit reached")).toBeInTheDocument();
  });

  it("renders empty message", () => {
    render(<SearchStatus status="empty" />);
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });
});
