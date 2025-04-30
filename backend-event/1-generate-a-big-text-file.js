const fs = require("fs");

const file = fs.createWriteStream("big-file.txt");

for (let i = 0; i < 100000; i++) {
  file.write(`This is line number ${i + 1}\n`);
}

file.end();
