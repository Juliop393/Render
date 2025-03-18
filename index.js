const express = require('express');
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

