import './App.css';
import Table from './components/Table';
import Pagination from './components/Pagination';
import Header from './components/Header';
import Row from './components/Row';

import { useState, useEffect, useMemo } from 'react';

function App() {
  const [aPIData, setaPIData] = useState([]);
  const headerNames = {'name':false, 'city':false, 'state':false, 'telephone':false, 'genre':false, 'attire':true}; // { caseSensitivity: boolean, exactMatch: boolean, delimiter: '<insert delimiter>'}
  const filterOptions = [];

  useEffect( () => {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt", } })
      .then( response => response.json() )
      .then( data => {
        setaPIData(data)
        // createFilterOptions(filterOptions, data);
      });
  }, []);

  // const getHeaderNames = (data) => {
  //   const namesArray = data.map( datum => Object.keys(datum));
  //   let longestArray = [];
  //   namesArray.forEach(array => {
  //     if(array.length > longestArray) longestArray = array });
  //   return longestArray; }

  const [rowData, setRowData] = useState([]);
  const [column, setColumn] = useState('name');
  const [searchField, setSearchField] = useState();
  const [filterBy, setFilterBy] = useState({});
  const [pageNumber, setPageNumber] = useState(0);

  const filterData = (searchResult, filterBy) => {
    if( Object.keys(filterBy).length > 0 ) {
      return searchResult.filter( datum => {
        for ( const [column, value] of Object.entries(filterBy) ) {
          if(value.exact){
            if( !datum[column] || !(datum[column].toLowerCase() === value.value) ) return false; }
          else {
            if( !datum[column] || !datum[column].includes(value.value) ) return false; } }
        return true });
    }
    else { return searchResult }
  }

  const headers =
  Object.keys(headerNames).map( header => {
    //TODO: give indication when no results exist (filter or here)
    // empty categories (0 results) sorted to the end? tabindex for scroll-bottom, subsequently toggles to scroll-top
    const options = new Set;
    options.add('(all)');
    if(headerNames[header]){
      aPIData.forEach( datum => options.add( datum[header].toLowerCase() ) )}
    else {
      aPIData.forEach( datum => options.add(datum[header]) )}

    return <Header key={header} name={header}
        clickEvent={(event) => setColumn(
          event.target.name )}
        options={[...options]}
        selectEvent={(event) => {
          const value = event.target.value, all = ( value === '(all)' );
          const name = event.target.name;
          setFilterBy(prevState => {
            const state = {...prevState};
            if(all) { delete state[name] }
            else { state[name] = {value:value, exact:headerNames[name]} }
            return state; })
        }}
      >header</Header>
  });

  const sortByColumn = (data, colName) => {
    return [...data].sort( (a, b) => {
      if (a[colName] > b[colName]) { return 1; }
      if (a[colName] < b[colName]) { return -1; }
      return 0;
    });
  }

  const searchCols = ['name', 'city', 'genre'];
  const searchData = (data, searchCols, searchField) => {
    // broadening action(s) on dataset
    if (searchField === '' || searchField === undefined) {
      return aPIData;
    }
    return data
    .filter( row => {
      return searchCols.some( col => {
        if( row[col] && row[col].includes(searchField) ) return true; }) })
  }

  const paginateData = (data) => {
    const numPages = Math.floor(data.length / 10) +
      ( (data.length % 10) > 0 ?
          1 : 0 );
    const paginatedData = [];
    for(let number = 0; number < numPages; number++) {
        paginatedData.push(
          data.slice((number*10), (number+1)*10) );
    }
    return paginatedData;
  }

  const searchResult = useMemo( () => searchData(aPIData, searchCols, searchField), [searchField, filterBy, searchCols, aPIData]);
  const filterResult = useMemo( () => filterData(searchResult, filterBy), [searchField, filterBy, searchResult]);
  const paginatedResult = useMemo( () => paginateData(rowData), [rowData]);


  useEffect(() => {
    setRowData(
      sortByColumn(filterResult, column));
  }, [filterResult]);

  const rows =
  paginatedResult && paginatedResult.length > 0 && Array.isArray(paginatedResult[pageNumber]) ?
    paginatedResult[pageNumber].map( rowDatum => {
      return <Row key={rowDatum.id} data={rowDatum} headers={Object.keys(headerNames)}></Row> }) : [];

  return (
    <div className="App">
      <label htmlFor="search">text search:</label>
      <input
        name="search" type="text" placeholder="name, city, or genre"
        onKeyUp={ (event) => {
          if (event.keyCode === 13) {
              setSearchField(event.target.value); }
        }}
      />
      <Table headers={headers} rows={rows}/>
      <Pagination pageNumber={pageNumber} pages={paginatedResult} setPageNumber={setPageNumber}/>
    </div>
  );
}

export default App;
