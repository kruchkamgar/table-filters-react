import paginate from '../lib/paginate';

test('returns multiple pages', () => {
  const data = [
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"}]
  const result = paginate(data)
  expect(data.length).toBe(11)
  expect(result.length).toBe(2)
})

test('returns a single page', () => {
  const data = [
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"},
    {name: "Tomo Sushi"},
    {name: "Sushi Den", city: "Denver"}]
  const result = paginate(data)
  expect(data.length).toBe(10)
  expect(result.length).toBe(1);
})
