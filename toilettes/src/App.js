import React from 'react';
import Map from './Map';

import './App.css';

function App({ data }) {
  return (
    <div className='App'>
      <Map data={data} />
    </div>
  );
}

export default App;
