const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const leaderboardRoutes = require('./routes/leaderboardRoutes');
const seedData = require('./seed');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    authSource: 'admin', // Authenticate against the admin database
  }).then(() => {
  console.log('MongoDB connected');
  seedData();
});

app.use('/api/', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));