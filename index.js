const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Configuración 100% funcional (YA INCLUYE TOKEN, URL y PERSONAID)
app.post('/sendBill', async (req, res) => {
    try {
        // Datos preconfigurados
        const CONFIG = {
            URL_PROVEEDOR: "https://back.apisunat.com/documents/sendBill",
            TOKEN: "DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV",
            PERSONA_ID: "67d8940738679e0015b3d521"
        };

        console.log("✅ Body recibido desde Make:", JSON.stringify(req.body, null, 2));

        // Envía la solicitud a APISUNAT
        const response = await axios.post(
            CONFIG.URL_PROVEEDOR,
            {
                personaId: CONFIG.PERSONA_ID, // Campo obligatorio
                ...req.body
            },
            {
                headers: {
                    "Authorization": `Bearer ${CONFIG.TOKEN}`,
                    "Content-Type": "application/json"
                },
                timeout: 10000 // Evita tiempos de espera infinitos
            }
        );

        console.log("🔥 Respuesta de APISUNAT:", JSON.stringify(response.data, null, 2));
        res.status(200).json(response.data);

    } catch (error) {
        console.error("❌ Error crítico:", error.message);
        console.error("Detalles técnicos:", error.response?.data || "Sin respuesta del servidor");
        res.status(500).json({
            error: "Error en el servidor",
            detalles: error.message
        });
    }
});

app.listen(port, () => console.log("🚀 Servidor activo en puerto " + port));
