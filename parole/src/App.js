import React from 'react';
import randomColor from 'randomcolor';
import { Line } from 'react-chartjs-2';

import './App.css';

function App({ data }) {
  console.log('DATA France Culture', data['France Culture']);
  console.log('DATA France O', data['France O']);

  const datasets = Object.entries(data).map(([name, value]) => ({
    label: name,
    data: value.wers,
    borderColor: randomColor(),
    pointRadius: 2,
    fill: false,
  }));

  return (
    <div className='App'>
      <Line
        data={{
          labels: data['France Culture'].years,
          // datasets: [
          //   {
          //     label: 'Nostalgie',
          //     data: data['Nostalgie'].wers,
          //     borderColor: randomColor(),
          //     pointRadius: 2,
          //     fill: false,
          //   },
          // ],
          datasets,
        }}
        options={{
          legend: { display: true },
        }}
      />
    </div>
  );
}

export default App;
