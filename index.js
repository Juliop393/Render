const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para recibir solicitudes desde Make
app.post('/sendBill', async (req, res) => {
    try {
        // Token de la API de SUNAT
        const sunatToken = 'DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV';

        // Reenviar la solicitud a la API de SUNAT
        const response = await axios.post('https://api.sunat.com/documents/sendBill', req.body, {
            headers: {
                'Authorization': `Bearer ${sunatToken}`, // Usar el token aquí
                'Content-Type': 'application/json'
            }
        });

        // Devolver la respuesta de SUNAT a Make
        res.status(response.status).json(response.data);
    } catch (error) {
        // Manejar errores
        res.status(error.response?.status || 500).json({
            error: error.message
        });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

