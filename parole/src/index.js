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

  const xy = nameData.map(c => ({ x: c.year, y: c.women_expression_rate }));
  const years = nameData.map(c => c.year);
  const wers = nameData.map(c => c.women_expression_rate);

  const dataObject = {
    xy,
    years,
    wers,
    mediaType: nameData[0].media_type,
    isPublic: nameData[0].is_public_channel === 'True',
  };

  data[name] = dataObject;
});

function getAllYears(data) {
  return Object.values(data).reduce((acc, cur) => {
    return [...new Set([...acc, ...cur.years].sort())];
  }, []);
}

function getAllMediaTypes() {
  const allMediaTypes = new Set(paroles.map(d => d.media_type));

  return [...allMediaTypes];
}

console.log('YEARS', getAllYears(data));
console.log('Medias', getAllMediaTypes());

function harmonize(data) {
  const allYears = getAllYears(data);
  const newData = Object.entries(data).map(([name, value]) => {
    const newWers = allYears.map(year => {
      if (value.years.includes(year)) {
        const i = value.years.findIndex(y => y === year);
        return value.wers[i];
      }
      return null;
    });

    return [
      name,
      {
        years: allYears,
        wers: newWers,
        mediaType: value.mediaType,
        isPublic: value.isPublic,
      },
    ];
  });

  return Object.fromEntries(newData);
}

const harmonizedData = harmonize(data);
const types = getAllMediaTypes();

console.log('Harmonized Data', harmonizedData);

ReactDOM.render(
  <App data={harmonizedData} types={types} />,
  document.getElementById('root'),
);
