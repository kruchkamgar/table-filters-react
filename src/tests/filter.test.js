import filter from '../lib/filter.js';

// test basic case

test('filter included in comparison, by default', () => {
  const aPIData = [
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "American Steak", city: "San Francisco"}
  ]
  const singleFilter = {name: "Sushi"};
  const result = filter(aPIData, singleFilter)

  expect(result).toStrictEqual([
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"}
  ])
})

test('exact terms filter', () => {
  const aPIData = [
    {attire: "casual"},
    {attire: "Business Casual", city: "Denver"},
    {attire: "Casual wear", city: "San Francisco"}
  ]
  const singleFilter = {attire: "Casual"};
  const result = filter(aPIData, singleFilter)
  expect(result).toStrictEqual([
    {attire: "casual"}
  ])
})

test('multiple filters', () => {
  const aPIData = [
    {attire: "casual", city:"Denver"},
    {attire: "Business Casual", city: "Denver"},
    {attire: "Casual wear", city: "San Francisco"}
  ]
  const multipleFilters = {attire: "Business casual", city:"Denver"};
  const result = filter(aPIData, multipleFilters)
  expect(result).toStrictEqual([
    {attire: "Business Casual", city: "Denver"}
  ])
})

// jest.mock('headersConfig', ()=> {
  // return {genre: {caseSensitivity: true}, city:false}; })
