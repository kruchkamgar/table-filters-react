import headersConfig from '../config/headersConfig'
import filter from '../lib/filter.js';

jest.mock('../config/headersConfig')
// test case sensitivity
test('case sensitive filter', () => {
  const aPIData = [
    {genre: "casual", city: "Denver"},
    {genre: "Tuscan", city: "Denver"}]
  const casefilter = {genre: "tuscan"}
  const result = filter(aPIData, casefilter)
  expect(result.length).toBe(0);
})
