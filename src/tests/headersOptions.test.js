import getHeaderOptions from '../lib/headersOptions';

test('returns header options according to config', () => {
  const data = [
    {name: "Pho4u", city: "San Francisco", genre: "Asian,Pho", attire: "fast casual", state: "CA", telephone: "403-626-2626" },
    {name: "Burger Hive", city: "Denver", genre: "American,burger", attire: "formal", state: "CO", telephone: "303-242-4242"}]

  const headersConfig = {
    'name': false, 'city':true,'state':{caseSensitivity: true}, 'telephone':false, 'genre': {delimiter: ','}, 'attire': {caseSensitivity: false, exactTerms: true} }

  const result = getHeaderOptions(data, headersConfig)
  const toArrays = {};
  for(const [key, value] of Object.entries(result)) {
    toArrays[key] = value }

  expect(toArrays).toEqual({
    "attire": {"fast casual": 1, "formal": 1 },
    "city": {"denver": 1, "san francisco": 1},
    "genre": {"american,burger": 1, "asian,pho": 1},
    "state": {"ca": 1, "co": 1}
  })
})
