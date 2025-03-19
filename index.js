const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para recibir solicitudes desde Make
app.post('/sendBill', async (req, res) => {
    try {
        // Datos de autenticación
        const personaId = '67d8940738679e0015b3d521'; // Tu personaId
        const personaToken = 'DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV'; // Tu personaToken

        // Datos de la factura (desde el body de la solicitud)
        const facturaData = {
            personaId: personaId,
            personaToken: personaToken,
            ...req.body // Incluye los datos de la factura enviados desde Make
        };

        // Reenviar la solicitud a la API de SUNAT
        const response = await axios.post('https://api.sunat.com/documents/sendBill', facturaData, {
            headers: {
                'Authorization': `Bearer ${personaToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Devolver la respuesta de SUNAT a Make
        res.status(response.status).json(response.data);
    } catch (error) {
        // Manejar errores
        res.status(error.response?.status || 500).json({
            error: error.message,
            details: error.response?.data // Detalles del error de SUNAT
        });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
