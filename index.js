const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/sendBill', async (req, res) => {
    try {
        // Configuración de APISUNAT
        const CONFIG = {
            URL: "https://back.apisunat.com/personas/v1/sendBill", // Endpoint oficial
            TOKEN: "DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV",
            PERSONA_ID: "67d8940738679e0015b3d521"
        };

        // Generar fileName según formato SUNAT: RRRRRRRRRRR-TT-SSSS-CCCCCCCC
        const fileName = `20123456789-01-F001-00000001`; // Ejemplo: RUC + Tipo Doc + Serie + Número

        // Body requerido por APISUNAT
        const bodyAPISUNAT = {
            personaId: CONFIG.PERSONA_ID,
            personaToken: CONFIG.TOKEN,
            fileName: fileName,
            documentBody: req.body, // Todos los datos de la factura van aquí
            customerEmail: req.body.customerEmail // Opcional
        };

        // Enviar a APISUNAT
        const response = await axios.post(CONFIG.URL, bodyAPISUNAT, {
            headers: { "Content-Type": "application/json" }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Error en APISUNAT",
            detalles: error.response?.data || error.message
        });
    }
});

app.listen(port, () => console.log("✅ Servidor listo en puerto " + port));
