import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("component renders blog's title and author, but no url or likes", () => {
  test("renders blog title", () => {
    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 333,
    };

    const { container } = render(<Blog blog={blog} />);
    const displayedDiv = container.querySelector(".basicInfo");
    expect(displayedDiv).toHaveStyle("display: block");
    const hiddenDiv = container.querySelector(".moreInfo");
    expect(hiddenDiv).toHaveStyle("display: none");

    screen.debug();
  });
});

