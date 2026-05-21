import { render, screen } from "@testing-library/react";
import { UserCard } from "./UserCard";
import type { GitHubUser } from "@/features/search/types";

const user: GitHubUser = {
  id: 1,
  login: "torvalds",
  avatar_url: "https://example.com/avatar.jpg",
  html_url: "https://github.com/torvalds",
};

describe("UserCard", () => {
  it("renders avatar with login as alt text", () => {
    render(<UserCard user={user} />);
    expect(screen.getByRole("img", { name: "torvalds" })).toHaveAttribute(
      "src",
      user.avatar_url,
    );
  });

  it("links to GitHub profile in a new tab", () => {
    render(<UserCard user={user} />);
    const link = screen.getByRole("link", { name: "View profile" });
    expect(link).toHaveAttribute("href", user.html_url);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
