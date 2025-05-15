// Imports & config
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import express from 'express';
import { expressjwt } from 'express-jwt';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = 3000;

// Express app & global middleware
const app = express();
app.use(express.json());

// Public authentication route: issue a token
app.post('/getToken', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = JSON.parse(await fs.readFile('./users.json', 'utf-8'));
    const user = userData.users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      return res.status(401).json({ errorMessage: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '10s',
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// Helper functions
const DATA_FILE = './cards.json';
async function loadCards() {
  const text = await fs.readFile(DATA_FILE, 'utf-8');
  const obj = JSON.parse(text);
  return obj.cards;
}
async function saveCards(cards) {
  const newData = JSON.stringify({ cards }, null, 2);
  await fs.writeFile(DATA_FILE, newData, 'utf-8');
}

// Public cards route
app.get('/cards', async (req, res, next) => {
  try {
    let cards = await loadCards();
    for (const [key, val] of Object.entries(req.query)) {
      cards = cards.filter((c) => String(c[key]) === val);
    }
    res.json({ cards });
  } catch (err) {
    next(err);
  }
});

// JWT-Protection middleware
const authenticate = expressjwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
});

// Protected create/update/delete routes
app.post('/cards/create', authenticate, async (req, res, next) => {});
app.put('/cards/:id', authenticate, async (req, res, next) => {});
app.delete('/cards/:id', authenticate, async (req, res, next) => {});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
