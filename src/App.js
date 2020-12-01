import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Row from './components/Row';

import { useState, useEffect, useMemo } from 'react';

function App() {
  // const headerNames = [
  //   'name', 'city', 'state', 'genre', 'attire', 'phoneNumber'
  // ]
  const [aPIData, setaPIData] = useState([
    {name: "Capri", city: "Denver"},
    {name: "Pho4U", city: "Denver"},
    {name:"Dive", city: "San Francisco"}
  ])
  const getHeaderNames = (data) => {
    const namesArray = data.map( datum => Object.keys(datum));
    let longestArray = [];
    namesArray.forEach(array => {
      if(array.length > longestArray) longestArray = array });
    return longestArray;
  }
  const headerNames = getHeaderNames(aPIData);
  const [rowData, setRowData] = useState([]); // remove initialization when adding fetch
  const [column, setColumn] = useState();
  const [searchField, setSearchField] = useState();
  const [filterBy, setFilterBy] = useState({
    column: [], value: '' });
  const [pageNumber, setPageNumber] = useState(0);

  const filterData = (searchResult, filterBy) => {
    if(filterBy.column.length > 0) {
      return searchResult.filter( datum => {
        // if a false value not found (#find returns undefined), include the datum
        return filterBy.column.find(col => {
          return !datum[col].includes(filterBy.value) }) === undefined ?
            true : false; })}
    else { return searchResult }
  }

  useEffect(() => {
    setRowData(aPIData);
  }, [aPIData]);
  useEffect(() => {
    setRowData(
      sortByColumn(rowData, column) );
  }, [column]);

  const headers =
  headerNames.map( name => {
    // empty categories (0 results) sorted to the end? tabindex for scroll-bottom, subsequently toggles to scroll-top
    const options = aPIData.map(datum => datum[name]);
    options.unshift('(all)');
    return <Header key={name} name={name}
        clickEvent={(event) => setColumn(
          event.target.getAttribute('name') )}
        options={options}
        selectEvent={(event) => {
          const value = event.target.value, all = ( value === '(all)' );
          setFilterBy(prevState => {
            return {
              column: all ?
                [] : [...prevState, event.target.getAttribute('name')],
              value: all ?
                '' : value } })
        }}
      >name</Header>
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
    const numPages = (data.length / 10).toFixed(0) +
      (data.length % 10) > 0 ?
        1 : 0;
    const paginatedData = [];
    for(let number = 0; number < numPages; number++) {
        paginatedData.push(
          data.slice((number*10), (number+1)*10 -1) );
    }
    return paginatedData;
  }

  const searchResult = useMemo( () => searchData(aPIData, searchCols, searchField), [searchField, filterBy, searchCols]);
  const filterResult = useMemo( () => filterData(searchResult, filterBy), [searchField, filterBy]);
  const paginatedResult = useMemo( () => paginateData(filterResult), [filterResult]);

  useEffect(()=> {
    setRowData(paginatedResult);
  }, [filterResult]);

  const rows =
  rowData && rowData.length > 0 ?
    rowData[pageNumber].map( datum => {
      return <Row key={datum.name} name={datum.name}></Row> }) : [];

  return (
    <div className="App">
      <label for="search">text search:</label>
      <input
        name="search" type="text" placeholder="name, city, or genre"
        onKeyUp={ (event) => {
          if (event.keyCode === 13) {
              setSearchField(event.target.value); }
        }}
      />
      <Table headers={headers} rows={rows}></Table>
    </div>
  );
}

export default App;
