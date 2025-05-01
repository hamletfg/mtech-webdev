import { createObjectCsvWriter } from 'csv-writer';
const csvWriter = createObjectCsvWriter({
  path: './data/students.csv',
  header: [
    { id: 'name', title: 'FirstName' },
    { id: 'status', title: 'Status' },
  ],
  append: false,
});

const students = [
  { name: 'Jake', status: 'full' },
  { name: 'Josh', status: 'part' },
  { name: 'Jacob', status: 'full' },
];

csvWriter.writeRecords(students).then(() => {
  console.log('completed');
});
