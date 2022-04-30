const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('total likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(13)
  })
})

