import headersConfig from "../config/headersConfig";

const filterData = (searchResult, filterBy) => {
  if( Object.keys(filterBy).length > 0 ) {
    return searchResult.filter( datum => {
      for ( let [column, filter] of Object.entries(filterBy) ) {
        const config = headersConfig[column];
        let comparison = datum[column];
        if(!config.caseSensitivity){
          comparison = comparison.toLowerCase();
          filter = filter.toLowerCase(); }
        if(config.exactTerms){
          if( !comparison || !(comparison === filter) ) return false; }
        else {
          if( !comparison || !comparison.includes(filter) ) return false; } }
      return true });
  }
  else { return searchResult }
}

export default filterData
