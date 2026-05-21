import { render, screen } from "@testing-library/react";
import { SearchProvider } from "@/features/search/context";
import { ActionBar } from "./ActionBar";

function renderActionBar() {
  render(
    <SearchProvider>
      <ActionBar />
    </SearchProvider>,
  );
}

describe("ActionBar", () => {
  it("renders select-all checkbox", () => {
    renderActionBar();
    expect(
      screen.getByRole("checkbox", { name: "Select all" }),
    ).toBeInTheDocument();
  });

  it("duplicate button is disabled when nothing is selected", () => {
    renderActionBar();
    expect(screen.getByRole("button", { name: /duplicate/i })).toBeDisabled();
  });

  it("delete button is disabled when nothing is selected", () => {
    renderActionBar();
    expect(screen.getByRole("button", { name: /delete/i })).toBeDisabled();
  });
});
