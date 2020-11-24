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
    {name: "Pho4U"}
  ])
  const [rowData, setRowData] = useState(aPIData);
  const [column, setColumn] = useState();

  useEffect(() => {
    sortByColumn(rowData, column)
  }, [column])
  useEffect(() => {
    searchDomain(rowData);
  }, [rowData])

  const headers =
  headerNames.map( name => {
    return <Header key={name} name={name}
        clickEvent={(event) => setColumn(
          event.target.getAttribute('name')) }
      >name</Header>
  });

  const rows =
    rowData.map( datum => {
      return <Row key={datum.name} name={datum.name}></Row>
    })

  const sortByColumn = (data, colName) => {
    data.sort( (a, b) => {
      return a[colName] > b[colName] ?
        1 : -1;
    });
  }

  const searchCols = ['name', 'city', 'genre'];

  // memoize this domain
  const searchDomain = (data) => {
    return data.map( (datum, index) => {
      return { index: index,
        values: searchCols.map( col => datum[col] ) }
    });
  }

  const search = (data, searchCols, searchField) => {
    const domain = searchDomain(data);
    const matchedIndices = [];
    domain.forEach( (datum, index) => {
      if (datum.values.find(value => value === searchField)) {
        matchedIndices.push(datum.index) }
    });
    setRowData(
      matchedIndices.map(index => data[index]) )
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
