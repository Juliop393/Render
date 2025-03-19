const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/sendBill', async (req, res) => {
    try {
        const proveedorURL = "https://api.sunat.com/documents/sendBill"; // URL real del proveedor
        const personaToken = "DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV"; // Token corregido
        const personaId = "67d8940738679e0015b3d521";

        const response = await axios.post(
            proveedorURL,
            {
                personaId: personaId,
                ...req.body
            },
            {
                headers: {
                    "Authorization": `Bearer ${personaToken}`,
                    "Content-Type": "application/json"
                },
                timeout: 10000
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Error interno",
            detalles: error.message
        });
    }
});

app.listen(port, () => console.log(`Servidor activo en puerto ${port}`));
