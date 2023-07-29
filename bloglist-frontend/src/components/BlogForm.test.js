import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe.skip("check BlogForm component", () => {
  const blog = {
    title: "title test1",
    author: "author test1",
    url: "url test1",
  };
  test("form calls the event handler with the right details when new blog is created", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText("enter title");
    const authorInput = screen.getByPlaceholderText("enter author");
    const urlInput = screen.getByPlaceholderText("enter url");

    await user.type(titleInput, "title test1");
    await user.type(authorInput, "author test1");
    await user.type(urlInput, "url test1");

    const submitButton = await screen.getByText("save");
    fireEvent.click(submitButton);

    screen.debug();

    expect(createBlog).toHaveBeenCalledWith(blog);
    expect(createBlog).toHaveBeenCalled();
    expect(createBlog.mock.calls).toHaveLength(1);
  });
});
