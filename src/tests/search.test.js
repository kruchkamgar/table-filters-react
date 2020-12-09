import search from '../lib/search.js';

const aPIData = [
  {name: "Tomo Sushi"},
  {name: "Sushi Den", city: "Denver"},
  {name: "American Steak", city: "San Francisco"}
]

test('searches w/ lowercase term', () => {
  const searchField = "sushi"
  const result = search(aPIData, searchField)

  expect(result).toStrictEqual([
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
  ])
})

test('returns full data w/ no searchField', () => {
  const result = search(aPIData)

  expect(result.length).toBe(aPIData.length)
})
