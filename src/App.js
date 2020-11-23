import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Row from './components/Row';

import { useState, useEffect } from 'react';

function App() {
  const headerNames = [
    'name', 'city', 'state', 'genre', 'attire', 'phoneNumber'
  ]
  const [rowData, setRowData] = useState([
    {name: "Capri"},
    {name: "Pho4U"}
  ]);
  const [column, setColumn] = useState();

  useEffect(() => {
    sortByColumn(rowData, column)
  }, [column])

  const headers =
    headerNames.map( name => {
      return <Header key={name} name={name} click={(element) => setColumn(element.id)}>name</Header>
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

  return (
    <div className="App">
      <Table headers={headers} rows={rows}></Table>
    </div>
  );
}

export default App;
