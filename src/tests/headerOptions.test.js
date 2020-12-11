import getHeaderOptions from '../lib/headerOptions';

test('returns header options according to config', () => {
  const data = [
    {name: "Pho4u", city: "San Francisco", genre: "Asian,Pho", attire: "fast casual", state: "CA", telephone: "403-626-2626" },
    {name: "Burger Hive", city: "Denver", genre: "American,burger", attire: "formal", state: "CO", telephone: "303-242-4242"}]

  const headersConfig = {
    'name': false, 'city':false,'state':{caseSensitivity: true}, 'telephone':false, 'genre': {delimiter: ','}, 'attire': {caseSensitivity: false, exactTerms: true} }

  const result = getHeaderOptions(data, headersConfig)
  const toArrays = {};
  for(const [key, value] of Object.entries(result)) {
    toArrays[key] = [...value] }
  expect(toArrays).toEqual({
    "attire": ["(all)", "fast casual", "formal"],
    "city": ["(all)", "san francisco", "denver"],
    "genre": ["(all)", "asian", "pho", "american", "burger"],
    "name": ["(all)", "pho4u", "burger hive"],
    "state": ["(all)", "CA", "CO"],
    "telephone": ["(all)", "403-626-2626", "303-242-4242"] })
 })
