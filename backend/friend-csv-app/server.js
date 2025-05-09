import express from 'express';
import path from 'path';
import { fielURLToPath } from 'url';
import fs from 'fs/promises';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: parse URL-encoded form data
app.use(express.urlencoded({ extend: false }));

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle form submission
app.post('/add-friend', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    //Build a CSV line: firstName, lastName + newline
    const newLine = `${firstName},${lastName}\n`;

    // Append to data/friends.csv
    const csvPath = path.join(__dirname, 'data', 'friends.csv');
    await fs.appendFile(csvPath, newLine, 'utf8');

    // Redirect back to the form (so the browser clears inputs)
    res.redirect('/');
  } catch (err) {
    console.error('Error writing to CSV:', err);
    res.status(500).send('Oops! Something went wrong saving your friend. 🙁');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost${PORT}`);
});
