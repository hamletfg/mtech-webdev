import csv from 'csv-parser';
import fs from 'fs';
import { writeFile } from 'fs/promises';

const cars = []; // Stores all cars
const post2010Cars = []; // Stores cars built on/after 2010

fs.createReadStream('data/usedCars.csv')
  .pipe(csv())
  .on('data', (row) => {
    cars.push(row); // Store every car
    if (parseInt(row.year) >= 2010) {
      post2010Cars.push(row);
    }
  })
  .on('end', () => {
    generateReport(); // Call this when done reading
  });

async function generateReport() {
  const total = cars.length;
  const matched = post2010Cars.length;
  const notMatched = total - matched;

  // Print summary to console.
  console.log(`Finished parsing input file`);
  console.log(
    `matched count = ${matched}. Not matched count = ${notMatched}. Total count = ${total}`
  );

  // Write filtered cars to a new CSV file.
  const csvHeader = Object.keys(post2010Cars[0]).join(','); // Extract headers.
  const csvRows = post2010Cars.map((car) => Object.values(car).join(','));
  const csvContent = [csvHeader, ...csvRows].join('\n');

  await writeFile('data/post2010_cars.csv', csvContent);
  console.log('Report generated: data/post2010_cars.csv');
}
