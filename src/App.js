import './App.css';
import Table from './components/Table';
import Pagination from './components/Pagination';
import Header from './components/Header';
import Row from './components/Row';

import searchData from './lib/search';
import filterData from './lib/filter';
import headersConfig from './config/headersConfig';
import getHeaderOptions from './lib/headerOptions';

import { useState, useEffect, useMemo } from 'react';

function App() {
  const [aPIData, setaPIData] = useState([]);
  const [headerOptions, setHeaderOptions] = useState();
  // put into own file-- so that methods may import it (over including as an argument)
  const filterOptions = [];

// option counts feature--
  // const sumRowsPerOption = (data, options, column, config) => {
  //   for(const option in options){
  //     let count = 0;
  //     for(const datum of data) {
  //       count = datum[column].includes(options[option]) ?  // TODO: add config-specific operation
  //         count+1 : count; }
  //     options[option] = {options[option]: count};
  //   }
  // }

  useEffect( () => {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt", } })
      .then( response => response.json() )
      .then( data => {
        setaPIData(data)
        setHeaderOptions(
          getHeaderOptions(data, headersConfig) )
        // createFilterOptions(filterOptions, data);
      });
  }, []);

  const [headers, setHeaders] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [column, setColumn] = useState('name');
  const [searchField, setSearchField] = useState();
  const [filterBy, setFilterBy] = useState({});
  const [pageNumber, setPageNumber] = useState(0);

    useEffect( () => {
    if(headerOptions !== undefined) {
      const headerAdd = Object.keys(headersConfig).map( header => {
        //TODO: give indication when no results exist (filter or here)
        // empty categories (0 results) sorted to the end? tabindex for scroll-bottom, subsequently toggles to scroll-top
        return <Header key={header} name={header}
          clickEvent={(event) => setColumn(
            event.target.name )}
          options={[...headerOptions[header]]}
          selectEvent={(event) => {
            const value = event.target.value, all = ( value === '(all)' );
            const name = event.target.name;
            setFilterBy(prevState => {
              const state = {...prevState};
              if(all) { delete state[name] }
              // else { state[name] = {value:value, exact:headerNames[name]} }
              else { state[name] = value }
              return state; })
          }}
          >header</Header>
      });
      setHeaders(headerAdd);
    }
  }, [headerOptions])

  const sortByColumn = (data, colName) => {
    return [...data].sort( (a, b) => {
      if (a[colName] > b[colName]) { return 1; }
      if (a[colName] < b[colName]) { return -1; }
      return 0;
    });
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

  const searchResult = useMemo( () => searchData(aPIData, searchField), [searchField, filterBy, aPIData]);
  const filterResult = useMemo( () => filterData(searchResult, filterBy), [searchField, filterBy, searchResult]);
  const paginatedResult = useMemo( () => paginateData(rowData), [rowData]);


  useEffect(() => {
    setRowData(
      sortByColumn(filterResult, column));
  }, [filterResult]);

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
