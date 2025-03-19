const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/sendBill', async (req, res) => {
    try {
        console.log("Solicitud recibida desde Make:", req.body); // Log para ver el body recibido

        const proveedorURL = "https://back.apisunat.com/sendBill"; // Reemplaza con la URL real
        const personaToken = "DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV";
        const personaId = "67d8940738679e0015b3d521";

        const response = await axios.post(
            proveedorURL,
            {
                personaId: personaId,
                ...req.body
            },
            {
                headers: {
                    "Authorization": `Bearer ${DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV}`,
                    "Content-Type": "application/json"
                },
                timeout: 10000 // Añade timeout para evitar bloqueos
            }
        );

        console.log("Respuesta del proveedor:", response.data); // Log de la respuesta
        res.status(200).json(response.data);

    } catch (error) {
        console.error("Error en Render:", error.message); // Log del error
        if (error.response) {
            console.error("Detalles del error del proveedor:", error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: "Error interno al contactar al proveedor",
                detalles: error.message
            });
        }
    }
});

app.listen(port, () => console.log(`Servidor activo en puerto ${port}`));
