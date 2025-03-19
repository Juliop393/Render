const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/sendBill', async (req, res) => {
    try {
        const response = await axios.post(
            '<https://back.apisunat.com>', // Ej: https://api.proveedor.com/sendBill
            {
                personaId: '67d8940738679e0015b3d521',
                ...req.body 
            },
            {
                headers: {
                    'Authorization': 'Bearer DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV',
                    'Content-Type': 'application/json'
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            detalles: error.response?.data 
        });
    }
});

app.listen(port, () => console.log(`Servidor activo en puerto ${port}`));
