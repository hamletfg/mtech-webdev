import express from 'express';

const app = express(); // 1
const PORT = 3000; // 2

// 3: Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Card API! 🃏');
});

// 4: Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
