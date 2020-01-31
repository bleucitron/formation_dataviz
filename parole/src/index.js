import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import paroles from './parole.json';

// Trier
paroles.sort((p1, p2) => p1.year - p2.year);

console.log('Parole', paroles);

const data = {};

// Récupérer tous les noms uniques
const nameSet = new Set(paroles.map(p => p.channel_name));
const names = [...nameSet];

names.forEach(name => {
  // Pour une radio, créer la donnée utile
  const nameData = paroles.filter(p => p.channel_name === name);

  const years = nameData.map(c => c.year);
  const wers = nameData.map(c => c.women_expression_rate);

  const dataObject = {
    years,
    wers,
  };

  data[name] = dataObject;
});

console.log('Data', data);

ReactDOM.render(<App />, document.getElementById('root'));
