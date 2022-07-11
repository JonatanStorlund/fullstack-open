const { values } = require("lodash");
const _ = require("lodash");

const dummy = (anything) => {
  anything = 1
  return anything
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blogs) => totalLikes += blogs.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((previousBlog, currentBlog) => previousBlog.likes > currentBlog.likes ? previousBlog : currentBlog)
}

const mostBlogs = (blogs) => {
  return groupedByAuthor = _(blogs)
    .groupBy(blog => blog.author)
    .map((value, key) => ({author: key, blogs: value}))
    .value()
    .reduce((prevGroup, currGroup, index, arr) => {
      prevGroup = arr[index - 1]

    if (prevGroup?.blogs.length > currGroup.blogs.length) {
      return {
        author: prevGroup.author,
        blogs: prevGroup.blogs.length
      }
    }
  })
}

const mostLikes = (blogs) => {
  return blogs.reduce((previousBlog, currentBlog) => previousBlog.likes > currentBlog.likes
    ? { author: previousBlog.author, likes: previousBlog.likes }
    : { author: currentBlog.author, likes: currentBlog.likes}
  )
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}