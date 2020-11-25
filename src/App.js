import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Row from './components/Row';

import { useState, useEffect } from 'react';

function App() {
  const headerNames = [
    'name', 'city', 'state', 'genre', 'attire', 'phoneNumber'
  ]
  const [aPIData, setaPIData] = useState([
    {name: "Capri", city: "Denver"},
    {name: "Pho4U", city: "Denver"},
    {name:"Dive", city: "San Francisco"}
  ])
  const [rowData, setRowData] = useState(aPIData); // remove initialization when adding fetch
  const [column, setColumn] = useState();

  useEffect(() => {
    setRowData(aPIData);
  }, [aPIData]);
  useEffect(() => {
    setRowData(
      sortByColumn(rowData, column) );
  }, [column]);

  const headers =
  headerNames.map( name => {
    return <Header key={name} name={name}
        clickEvent={(event) => setColumn(
          event.target.getAttribute('name')) }
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
    if (searchField === '') {
      setRowData(aPIData);
      return true; }
    setRowData(
      data.filter( row => {
        return searchCols.some( col => {
          if( row[col] && row[col].includes(searchField) ) return true; }) })
    );
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="name, city, or genre"
        onKeyUp={ (event) => {
          if (event.keyCode === 13) {
            search(rowData, searchCols, event.target.value) } }}
      />
      <Table headers={headers} rows={rows}></Table>
    </div>
  );
}

export default App;
