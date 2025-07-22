
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const animalRoutes = require('./routes/animalRoutes');
app.use('/api/animales', animalRoutes);

app.get('/', (req, res) => {
  res.send('🐯 API Zoológico funcionando');
});

app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});

