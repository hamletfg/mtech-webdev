const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/date', (req, res) => {
  console.log('Getting a request from client');
  res.send(new Date().toString());
});

app.get('/Brownie', (req, res) => {
  const filepath = path.join(__dirname, 'yummy.txt');
  res.sendFile(filepath);
});

app.get('/index.html', (req, res) => {
  const filepath = path.join
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
