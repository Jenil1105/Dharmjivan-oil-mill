require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI is required in environment variables');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Serve static files from the views directory
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Use item routes
app.use('/items', itemRoutes);

// User routes
app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
