import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("check Blog component", () => {
  //   let container;
  //   beforeEach(() => (container = render(<Blog blog={blog} />).container));

  const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 333,
    user: "test user",
    id: "test id",
  };

  test.skip("renders blog's title and author, but no url or likes", () => {
    const { container } = render(<Blog blog={blog} />);
    const displayedDiv = container.querySelector(".basicInfo");
    expect(displayedDiv).toHaveStyle("display: block");
    const hiddenDiv = container.querySelector(".moreInfo");
    expect(hiddenDiv).toHaveStyle("display: none");
  });

  test.skip("renders blog url and like number when button clicked", async () => {
    const { container } = render(<Blog blog={blog} />);
    const hiddenDiv = container.querySelector(".moreInfo");

    const user = userEvent.setup();
    const button = screen.getAllByText("view");
    await user.click(button[0]);
    expect(hiddenDiv).not.toHaveStyle("display: none");
  });

  test("clicking the like button twice calls the handler twice", () => {
    const addLike = jest.fn();

    render(<Blog blog={blog} handleLikes={addLike} />);

    const likeButton = screen.getByText("like");

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(addLike.mock.calls).toHaveLength(2);
  });
});
