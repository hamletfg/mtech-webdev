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
app.post('/cards/create', authenticate, async (req, res, next) => {
  try {
    const cards = await loadCards();
    const newCard = req.body;

    //Basic validation
    const required = ['name', 'set', 'cardNumber', 'type', 'rarity', 'cost'];
    for (const f of required) {
      if (!newCard[f]) {
        return res
          .status(400)
          .json({ errorMessage: `Missing required field: ${f}` });
      }
    }

    // Unique ID
    const maxId = cards.reduce((m, c) => Math.max(m, c.id), 0);
    newCard.id = maxId + 1;

    cards.push(newCard);
    await saveCards(cards);

    res.status(201).json({
      successMessage: 'Card created successfully',
      card: newCard,
    });
  } catch (err) {
    next(err);
  }
});

app.put('/cards/:id', authenticate, async (req, res, next) => {
  try {
    const cards = await loadCards();
    const id = Number(req.params.id);
    const idx = cards.findIndex((c) => c.id === id);
    if (idx === -1) {
      return res.status(404).json({ errorMessage: 'Card not found' });
    }

    // Merge updates, but preserve id
    cards[idx] = { ...cards[idx], ...req.body, id };
    await saveCards(cards);

    res.json({
      successMessage: 'Card updated successfully',
      card: cards[idx],
    });
  } catch (err) {
    next(err);
  }
});

app.delete('/cards/:id', authenticate, async (req, res, next) => {
  try {
    const cards = await loadCards();
    const id = Number(req.params.id);
    const idx = cards.findIndex((c) => c.id === id);
    if (idx === -1) {
      return res.status(404).json({ errorMessage: 'Card not found' });
    }

    const [removed] = cards.splice(idx, 1);
    await saveCards(cards);

    res.json({
      successMessage: 'Card deleted succesfully',
      card: removed,
    });
  } catch (err) {
    next(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
