import React from 'react';
import randomColor from 'randomcolor';
import { Line } from 'react-chartjs-2';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTypes: new Set(props.types),
      isPublic: true,
    };

    this.toggleType = this.toggleType.bind(this);
  }

  toggleType(type) {
    const { types } = this.props;
    const { selectedTypes } = this.state;

    let newTypes = new Set(selectedTypes);

    if (newTypes.has(type)) newTypes.delete(type);
    else newTypes.add(type);

    if (newTypes.size === 0) newTypes = new Set(types);

    this.setState({
      selectedTypes: new Set(newTypes),
    });
  }

  togglePublic() {
    this.setState({
      isPublic: !this.state.isPublic,
    });
  }

  render() {
    const { data, types } = this.props;
    const { selectedTypes, isPublic } = this.state;

    console.log('is public', isPublic);

    const datasets = Object.entries(data)
      .filter(([name, value]) => isPublic === value.isPublic)
      .filter(([name, value]) => selectedTypes.has(value.mediaType))
      .map(([name, value]) => ({
        label: name,
        data: value.wers,
        borderColor: randomColor(),
        pointRadius: 2,
        fill: false,
      }));

    console.log('DATASET', datasets);

    const buttons = types.map(t => (
      <button
        className={selectedTypes.has(t) ? 'selected' : ''}
        onClick={() => this.toggleType(t)}
        key={t}
      >
        {t}
      </button>
    ));

    let publicText;
    if (isPublic === undefined) publicText = 'all';
    else if (isPublic) publicText = 'public';
    else publicText = 'private';

    buttons.push(
      <button onClick={() => this.togglePublic()} key='public'>
        {publicText}
      </button>,
    );

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
        <div>{buttons}</div>
      </div>
    );
  }
}

export default App;
