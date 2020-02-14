import React from 'react';
import randomColor from 'randomcolor';
import { Line } from 'react-chartjs-2';

import './App.css';

class App extends React.Component {
  render() {
    const { data, types } = this.props;

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
            datasets,
          }}
          options={{
            legend: { display: true },
          }}
        />
      </div>
    );
  }
}

export default App;
