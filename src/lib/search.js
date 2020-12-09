import headersConfig from '../config/headersConfig';

const searchData = (data, searchCols, searchField) => {
  // broadening action(s) on dataset
  if (searchField === '' || searchField === undefined) {
    return data;
  }
  return data
    .filter( row => {
      return searchCols.some( col => {
        if(headersConfig[col].caseSensitivity){
          if( row[col] && row[col].includes(searchField) ) return true; }
        else { if( row[col] && row[col].toLowerCase().includes(searchField.toLowerCase()) ) return true; } })
    })
}

export default searchData
