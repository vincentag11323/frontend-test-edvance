import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import MovieSortDropdown from "./MovieSortDropdown";
import userEvent from "@testing-library/user-event";

describe("MovieSortDropdown test suite", () => {
  // selects Popularity (Highest) - value: 'popularity.desc'
  test("should call onSortChange with 'popularity.desc' when selected", async () => {
    const user = userEvent.setup();
    const mockOnSortChange = jest.fn();

    render(
      <MovieSortDropdown
        sortValue="original_title.asc"
        onSortChange={mockOnSortChange}
      />,
    );

    const selectButton = screen.getByRole("combobox", { name: /sort by/i });
    await user.click(selectButton);

    const optionToSelect = screen.getByRole("option", {
      name: /popularity \(highest\)/i,
    });

    await user.click(optionToSelect);

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith("popularity.desc");
  });

  // selects Release Date (Newest) - value: 'release_date.desc'
  test("should call onSortChange with 'release_date.desc' when selected", async () => {
    const user = userEvent.setup();
    const mockOnSortChange = jest.fn();

    render(
      <MovieSortDropdown
        sortValue="original_title.asc"
        onSortChange={mockOnSortChange}
      />,
    );

    const selectButton = screen.getByRole("combobox", { name: /sort by/i });
    await user.click(selectButton);

    const optionToSelect = screen.getByRole("option", {
      name: /release date \(newest\)/i,
    });

    await user.click(optionToSelect);

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith("release_date.desc");
  });

  // selects Alphabetical (A-Z) - value: 'original_title.asc'
  test("should call onSortChange with 'original_title.asc' when selected", async () => {
    const user = userEvent.setup();
    const mockOnSortChange = jest.fn();

    render(
      <MovieSortDropdown
        sortValue="release_date.desc"
        onSortChange={mockOnSortChange}
      />,
    );

    const selectButton = screen.getByRole("combobox", { name: /sort by/i });
    await user.click(selectButton);

    const optionToSelect = screen.getByRole("option", {
      name: /alphabetical \(a-z\)/i,
    });

    await user.click(optionToSelect);

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith("original_title.asc");
  });
});
