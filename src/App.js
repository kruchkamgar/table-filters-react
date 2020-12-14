import './App.css';
import Table from './components/Table';
import Pagination from './components/Pagination';
import Header from './components/Header';
import Row from './components/Row';

import searchData from './lib/search';
import filterData from './lib/filter';
import headersConfig from './config/headersConfig';
import getHeadersOptions from './lib/headersOptions';
import paginateData from './lib/paginate';

import { useState, useEffect, useMemo } from 'react';

function App() {
  const [aPIData, setaPIData] = useState([]);
  const [headersOptions, setHeadersOptions] = useState();
  // put into own file-- so that methods may import it (over including as an argument)
  const filterOptions = [];

  useEffect( () => {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt", } })
      .then( response => response.json() )
      .then( data => {
        setaPIData(data)
        setHeadersOptions(
          getHeadersOptions(data, headersConfig) )
        // createFilterOptions(filterOptions, data);
      });
  }, []);

  const [headers, setHeaders] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [column, setColumn] = useState('name');
  const [searchField, setSearchField] = useState();
  const [filterBy, setFilterBy] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  // keep track of each filterResult prior to application of each column filter
  const [baselineFilterResults, setBaselineFilterResults] = useState({});

  useEffect( () => {
    if(headersOptions !== undefined) {
      const headerAdd = Object.keys(headersConfig).map( header => {
        // user story note: only shows an option if exists in data (per user story 3 --otherwise, would show (0) next to state, if even empty states populated)
        // idea: empty categories (0 results) sorted to the end? tabindex for scroll-bottom, subsequently toggles to scroll-top
        const selectEvent = (event) => {
          const value = event.target.value, all = ( value === '(all)' );
          const name = event.target.name;
          setFilterBy(prevState => {
            const state = {...prevState};
            if(all) { delete state[name] }
            else { state[name] = value }
            return state; }) }

        return <Header key={header} name={header}
          clickEvent={(event) => setColumn(
            event.target.getAttribute('name') )}
          options={headersOptions[header]}
          selectEvent={selectEvent}
          filterBy={filterBy}
          >header</Header>
      });
      setHeaders(headerAdd);
    }
  }, [headersOptions])

  const sortByColumn = (data, colName) => {
    return [...data].sort( (a, b) => {
      if (a[colName] > b[colName]) { return 1; }
      if (a[colName] < b[colName]) { return -1; }
      return 0;
    });
  }

  const searchResult = useMemo( () => searchData(aPIData, searchField), [searchField, aPIData]);
  const filterResult = useMemo( () => filterData(searchResult, filterBy), [searchField, filterBy, searchResult]);
  const paginatedResult = useMemo( () => paginateData(rowData), [rowData]);

  useEffect(() => {
    setRowData(
      sortByColumn(filterResult, column));
      const newBaselineFilterResults = {};
      // add headerConfig parent set, to set all filters with new filterResult
      for( const[header, config] of Object.entries(headersConfig) ) {
          const isolationFilterBy = {...filterBy};
          delete isolationFilterBy[header];
          newBaselineFilterResults[header] = filterData(searchResult, isolationFilterBy)
      }
      setBaselineFilterResults(newBaselineFilterResults) }
      // set filter results for each active filterBy column, independently
        // update the column filter results only when the filterBy update involves a different column
  }, [filterResult]);

  useEffect(() => {
    if(Object.keys(baselineFilterResults).length > 0) {
      const updatedHeaderOptions = getHeadersOptions(baselineFilterResults, headersConfig, true)

      setHeadersOptions(prevState => {
        return Object.assign({}, prevState, updatedHeaderOptions);
      }) }
  }, [baselineFilterResults]);

  const rows =
  paginatedResult && paginatedResult.length > 0 && Array.isArray(paginatedResult[pageNumber]) ?
    paginatedResult[pageNumber].map( rowDatum => {
      return <Row key={rowDatum.id} data={rowDatum} headers={Object.keys(headersConfig)}></Row> }) : [];

  const initiateSearch = (event) => { if(event.keyCode===13) setSearchField(event.target.value) }

  return (
    <div className="App">
      <label htmlFor="search">text search:</label>
      <input
        name="search" type="text" placeholder="name, city, or genre"
        onKeyUp={ (event) => { //very slow... move to 'onChange' for input perhaps
          initiateSearch(event);
          // if (event.keyCode === 13) {
          //     setSearchField(event.target.value); }
        }}
      />
      <Table headers={headers} rows={rows}/>
      <Pagination pageNumber={pageNumber} pages={paginatedResult} setPageNumber={setPageNumber}/>
    </div>
  );
}

export default App;
