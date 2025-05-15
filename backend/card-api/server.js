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
    const user = usersData.users.find(
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
  const obj = JSON.parse(text).cards;
}

async function saveCards(cards) {
  const newData = JSON.stringify({ cards }, null, 2);
  await fs.writeFile(DATA_FILE, newData, 'utf-8');
}

// Public Cards Route

// Create endpoint to add a new card
app.post('/cards/create', async (req, res, next) => {
  try {
    // Load existing cards
    const cards = await loadCards();

    // Extract new card data from body
    const newCard = req.body;

    // Basic validation
    const requiredFields = [
      'name',
      'set',
      'cardNumber',
      'type',
      'rarity',
      'cost',
    ];
    for (const field of requiredFields) {
      if (!newCard[field]) {
        return res
          .status(400)
          .json({ errorMessage: `Missing required field: ${field}` });
      }
    }

    // Generate unique ID
    const maxId = cards.reduce((max, card) => Math.max(max, card.id), 0);
    newCard.id = maxId + 1;

    // Add to array
    cards.push(newCard);

    // Persist updated cards
    await saveCards(cards);

    // Respond with success
    res
      .status(201)
      .json({ successMessage: 'Card created successfully', card: newCard });
  } catch (err) {
    next(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
