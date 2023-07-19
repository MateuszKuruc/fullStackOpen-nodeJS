const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes);

    return likes.reduce((total, number) => total + number, 0)
}

const favoriteBlog = (blogs) => {
   const mostLikes = Math.max(...blogs.map(blog => blog.likes));
   const blogWithMostLikes = blogs.find(blog => blog.likes === mostLikes);
   return blogWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
