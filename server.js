// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Tillad alle domæner (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Hent kamp-liste
app.get('/api/matches/:sport', async (req, res) => {
  const sport = req.params.sport;
  try {
    const response = await fetch(`https://streamed.pk/api/matches/${sport}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Hent streams
app.get('/api/stream/:source/:id', async (req, res) => {
  const { source, id } = req.params;
  try {
    const response = await fetch(`https://streamed.pk/api/stream/${source}/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stream' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
