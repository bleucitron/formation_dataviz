import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const results = [];

fs.createReadStream(path.join(__dirname, '..', 'data', 'toilettes.csv'))
  .pipe(csv())
  .on('data', data => {
    const {
      adresse: address,
      typologie: typology,
      x_long: lon,
      y_lat: lat,
    } = data;

    results.push({
      address,
      typology,
      lon,
      lat,
    });
  })
  .on('end', () => {
    const jsonPath = path.join(__dirname, '..', 'data', 'toilettes.json');

    fs.writeFileSync(jsonPath, JSON.stringify(results));
  });
