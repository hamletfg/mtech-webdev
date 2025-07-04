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
      expiresIn: '10m',
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

// Route to get sets
app.get('/sets', async (req, res, next) => {
  try {
    // 1. Load all cards
    const cards = await loadCards();

    // 2. Extract unique sets using Set
    const uniqueSets = [...new Set(cards.map((card) => card.set))];

    // 3. Return the sets array
    res.json({ sets: uniqueSets });
  } catch (err) {
    next(err);
  }
});

// Route to get types
app.get('/types', async (req, res, next) => {
  try {
    const cards = await loadCards();
    const uniqueTypes = [...new Set(cards.map((card) => card.type))];
    res.json({ types: uniqueTypes });
  } catch (err) {
    next(err);
  }
});

// Route to get rarities
app.get('/rarities', async (req, res, next) => {
  try {
    const cards = await loadCards();
    const uniqueRarities = [...new Set(cards.map((card) => card.rarity))];
    res.json({ rarities: uniqueRarities });
  } catch (err) {
    next(err);
  }
});

// Route to get card count
app.get('/cards/count', async (req, res, next) => {
  try {
    const cards = await loadCards();
    res.json({
      count: cards.length,
      message: `Total number of cards: ${cards.length}`,
    });
  } catch (err) {
    next(err);
  }
});

// Route to get a random card
app.get('/cards/random', async (req, res, next) => {
  try {
    const cards = await loadCards();
    // Get a random index between 0 and cards.length -1
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomIndex];

    res.json({
      message: 'Random card selected!',
      card: randomCard,
    });
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

app.use((err, req, res, next) => {
  console.error('An error occurred:', err.stack || err); // Log the full error stack

  // Check if the error is from express-jwt (for unauthorized)
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ errorMessage: 'Invalid or missing token' });
  }

  // For other errors, determine status and message
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ errorMessage: message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
