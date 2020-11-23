import './App.css';
import Table from './components/Table';
import Header from './components/Header';

import { useState, useEffect } from 'react';

function App() {
  const headerNames = [
    'name', 'city', 'state', 'genre', 'attire', 'phoneNumber'
  ]

  const headers =
    headerNames.map( name => {
      return <Header id={name}>name</Header>
    });

  return (
    <div className="App">
      <Table headers={headers}></Table>
    </div>
  );
}

export default App;
