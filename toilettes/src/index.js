import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import data from './toilettes.json';

const typologies = new Set(data.map(({ typology }) => typology));
console.log('TYPOLOGIES', typologies);

ReactDOM.render(<App data={data} />, document.getElementById('root'));
