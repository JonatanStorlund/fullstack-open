const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('total likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(33)
  })
})

describe('favourite blog', () => {
  test('the blog with the most likes', () => {
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })
})

describe('most blogs', () => {
  test('most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author: blogs[0].author, blogs: blogs[0].blogs})
  })
})

describe('most likes', () => {
  test('most likes', () => {
    const result = listHelper.mostLikes(blogs)
    console.log()
    expect(result).toEqual({author: blogs[0].author, likes: blogs[0].likes})
  })
})

