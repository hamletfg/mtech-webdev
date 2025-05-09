const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('this is the root path');
});
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
