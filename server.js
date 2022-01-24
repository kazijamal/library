const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3030;

const app = express();

const userRoutes = require('./routes/users');
const finishedBookRoutes = require('./routes/finishedbooks');
const readingBookRoutes = require('./routes/readingbooks');
const highlightRoutes = require('./routes/highlights');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client', 'build')));

// Root route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Library API' });
});

// Use routes imported from routes directory
app.use('/api/users', userRoutes);
app.use('/api/finishedbooks', finishedBookRoutes);
app.use('/api/readingbooks', readingBookRoutes);
app.use('/api/highlights', highlightRoutes);

// Not found errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: 'Not found',
  });
});

// Internal server errors
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    status: 500,
    error: 'Internal server error',
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`server listening on port ${port}`));
