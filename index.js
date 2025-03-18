const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/v1/documents', async (req, res) => {
  try {
    const response = await fetch('https://back.apisunat.com/1.0/ubl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV'
      },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    console.error('Error al enviar a APISUNAT:', error);
    res.status(500)

