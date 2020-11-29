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
  const [rowData, setRowData] = useState(aPIData); // remove initialization when adding fetch
  const [column, setColumn] = useState();
  // const [searchData, setSearchData] = useState();
  // const [filterData, setFilterData] = useState();
  const [searchField, setSearchField] = useState();
  const [filterBy, setFilterBy] = useState();

  const filterData = () => {
    return false;
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
        selectEvent={(event) => setFilterBy(
          event.target.value )}
      >name</Header>
  });

  const rows =
  rowData.length > 0 ?
    rowData.map( datum => {
      return <Row key={datum.name} name={datum.name}></Row> }) : [];

  const sortByColumn = (data, colName) => {
    return [...data].sort( (a, b) => {
      if (a[colName] > b[colName]) { return 1; }
      if (a[colName] < b[colName]) { return -1; }
      return 0;
    });
  }

  const searchCols = ['name', 'city', 'genre'];
  const search = (data, searchCols, searchField) => {
    // broadening action(s) on dataset
    if (searchField === '' || searchField === undefined) {
      // if (honeStatus.filter) {
        // }
      return aPIData;
    }
    return data
    .filter( row => {
      return searchCols.some( col => {
        if( row[col] && row[col].includes(searchField) ) return true; }) })
  }

  const searchResult = useMemo( () => search(rowData, searchCols, searchField), [searchField, filterBy, searchCols]);
  // const filterResult = useMemo( () => filter(rowData, filterBy), [searchField, filterBy]);

  useEffect(()=> {
    setRowData(searchResult);
  }, [searchField, filterBy]);
  // const executeSearch = (data, searchCols, searchField) => {
  //   setRowData(searchResult);
  // }

  return (
    <div className="App">
      <label for="search">text search:</label>
      <input
        name="search" type="text" placeholder="name, city, or genre"
        onKeyUp={ (event) => {
          if (event.keyCode === 13) {
              // setSearchField
              setSearchField(event.target.value); }
        }}
      />
      <Table headers={headers} rows={rows}></Table>
    </div>
  );
}

export default App;
