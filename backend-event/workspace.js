const fs = require('fs');

fs.readdir('./', (err, files) => {
  if (err) throw err;
  console.log(files);
});

console.log('reading files');

fs.readFile('readme.md', 'utf8', (err, files) => {
  if (err) throw err;
  console.log(files);
});
console.log('reading files');

const data = fs.readFileSync('./testreadme.md', 'utf8');
console.log(data);

fs.writeFileSync('./tmp/message.txt', 'Writing to a file in sync mode');
console.log('file created');
