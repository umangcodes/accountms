const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://umangaeng:adminU@cluster0.k7yyend.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Use the main router
app.use('/api', mainRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Microservice running on port ${port}`);
});