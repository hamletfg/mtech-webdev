import express from 'express';

// Import our route modules
import loanRoutes from './routes/loan.js';
import savingsRoutes from './routes/savings.js';

// Instantiate the Express application
const app = express();

// Middleware parse JSON bodies for POST/PUT requests
app.use(express.json());

// Mount Routers
//    - Any request starting with /loan goes to loanRoutes
//    - Any request starting with /savings goes to savingsRoutes
app.use('/loan', loanRoutes);
app.use('/savings', savingsRoutes);

// Start the server on port 3000 (or use an env variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
