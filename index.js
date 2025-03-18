const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/enviarFactura', async (req, res) => {
    try {
        const response = await axios.post('https://api.apisunat.com/v1/documents', req.body, {
            headers: {
                'Authorization': 'Bearer TU_API_KEY_AQUI',
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({
            message: 'Factura enviada correctamente',
            sunatResponse: response.data
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({
            message: 'Error al enviar la factura',
            error: error.response?.data || error.message
        });
    }
});

app.get('/', (req, res) => {
    res.send('Servidor puente entre Make y APISUNAT activo.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});