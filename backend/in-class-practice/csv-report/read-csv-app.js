// read a csv file
import csv from 'csv-parser';
import fs from 'fs';

const targetLanguage = process.argv[2];

if (!targetLanguage) {
  console.error('Please specify a language');
  process.exit(1); // Exit if no language provided.
}

const people = [];

fs.createReadStream('data/data.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.language.toLowerCase() === targetLanguage.toLowerCase()) {
      people.push(row);
    }
  })
  .on('end', () => {
    console.log(`People who speak ${targetLanguage}:`);
    console.log(people);
  });
