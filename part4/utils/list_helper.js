const dummy = (anything) => {
  anything = 1
  return anything
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blogs) => totalLikes += blogs.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}