import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("check BlogForm component", () => {
  const blog = {
    title: "title test1",
    author: "author test1",
    url: "url test1",
  };
  test("form calls the event handler with the right details when new blog is created", async () => {
    const addBlog = jest.fn();

    render(<BlogForm createBlog={addBlog} />);
    const submitButton = screen.getByText("save");
    
    screen.debug();
  });
});

// test("clicking the like button twice calls the handler twice", () => {
//   const addLike = jest.fn();

//   render(<Blog blog={blog} handleLikes={addLike} />);

//   const likeButton = screen.getByText("like");

//   fireEvent.click(likeButton);
//   fireEvent.click(likeButton);

//   expect(addLike.mock.calls).toHaveLength(2);
// });
