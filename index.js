const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.apisunat.com/v1/send', // Usa aquí el endpoint real de APISUNAT
      req.body,
      {
        headers: {
          'Authorization': 'Bearer TU_TOKEN_AQUI',
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
