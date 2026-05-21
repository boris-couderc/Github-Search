import { render, screen } from "@testing-library/react";
import { SearchProvider } from "@/features/search/context";
import { UserList } from "./UserList";
import type { GitHubUser } from "@/features/search/types";

const users: GitHubUser[] = [
  {
    id: 1,
    login: "torvalds",
    avatar_url: "https://example.com/1.jpg",
    html_url: "https://github.com/torvalds",
  },
  {
    id: 2,
    login: "gvanrossum",
    avatar_url: "https://example.com/2.jpg",
    html_url: "https://github.com/gvanrossum",
  },
];

describe("UserList", () => {
  it("renders one card per result", () => {
    render(
      <SearchProvider>
        <UserList results={users} />
      </SearchProvider>,
    );
    expect(screen.getByRole("img", { name: "torvalds" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "gvanrossum" })).toBeInTheDocument();
  });
});
