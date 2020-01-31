import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const results = [];

fs.createReadStream(path.join(__dirname, '..', 'data', 'parole.csv'))
  .pipe(csv())
  .on('data', data => results.push(data))
  .on('end', () => {
    const jsonPath = path.join(__dirname, '..', 'data', 'parole.json');

    fs.writeFileSync(jsonPath, JSON.stringify(results));
    // console.log(results);
  });
