require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connect');

const urlRoutes = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.use('/user', userRoute);
app.use('/url', urlRoutes);
app.use('/', staticRouter);

// Connect to MongoDB and then start server
connectToMongoDB()
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1); // stop server if DB connection fails
  });