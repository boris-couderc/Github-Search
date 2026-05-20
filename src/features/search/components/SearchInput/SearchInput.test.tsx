import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders a search input", () => {
    render(<SearchInput value="" onChange={() => {}} loading={false} />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(
      <SearchInput value="torvalds" onChange={() => {}} loading={false} />,
    );
    expect(screen.getByRole("searchbox")).toHaveValue("torvalds");
  });

  it("calls onChange when the user types", async () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} loading={false} />);
    await userEvent.type(screen.getByRole("searchbox"), "a");
    expect(handleChange).toHaveBeenCalledWith("a");
  });

  it("shows a status indicator when loading", () => {
    render(<SearchInput value="" onChange={() => {}} loading={true} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("hides the status indicator when not loading", () => {
    render(<SearchInput value="" onChange={() => {}} loading={false} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
