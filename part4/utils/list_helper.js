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
  return blogs.reduce((previousBlog, currentBlog) => previousBlog.blogs > currentBlog.blogs
    ? { author: previousBlog.author, blogs: previousBlog.blogs }
    : { author: currentBlog.author, blogs: currentBlog.blogs}
  )
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