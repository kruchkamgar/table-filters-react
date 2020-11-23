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

  const headers =
    headerNames.map( name => {
      return <Header id={name} click={(element) => setColumn(element.id)}>name</Header>
    });

  const rows =
    rowData.map( datum => {
      return <Row id={datum.name} name={datum.name}></Row>
    })


  return (
    <div className="App">
      <Table>

      </Table>
    </div>
  );
}

export default App;
