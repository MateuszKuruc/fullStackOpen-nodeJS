import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("check Blog component", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 333,
  };

  const { container } = render(<Blog blog={blog} />);

  test.skip("renders blog's title and author, but no url or likes", () => {
    const displayedDiv = container.querySelector(".basicInfo");
    expect(displayedDiv).toHaveStyle("display: block");
    const hiddenDiv = container.querySelector(".moreInfo");
    expect(hiddenDiv).toHaveStyle("display: none");

    screen.debug();
  });

  test("renders blog url and like number when button clicked", async () => {
    const hiddenDiv = container.querySelector(".moreInfo");

    const user = userEvent.setup();
    const button = screen.getAllByText("view");
    await user.click(button[0]);
    expect(hiddenDiv).not.toHaveStyle("display: none");

    screen.debug();
  });

  test("if the like button is clicked twice, event handler is called twice", async () => {});
});
