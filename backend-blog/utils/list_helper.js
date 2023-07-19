const dummy = (blogs) => {
  return 1;
};

// const totalLikes = (blogs) => {
//   const likes = blogs.map((blog) => blog.likes);

//   const reducer = (total, number) => {
//     return total + number
//   }

//   return likes.reduce(reducer, 0);
// };

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes);

    return likes.reduce((total, number) => total + number, 0)
}

module.exports = {
  dummy,
  totalLikes,
};
