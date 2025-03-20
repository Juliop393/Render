const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/sendBill', async (req, res) => {
    try {
        // Configuración 100% validada
        const CONFIG = {
            URL: "https://back.apisunat.com/personas/v1/sendBill",
            TOKEN: "DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV",
            PERSONA_ID: "67d8940738679e0015b3d521"
        };

        // Generar fileName dinámico
        const ruc = "20123456789"; // Reemplaza con TU RUC
        const tipoDoc = "01"; // 01 = Factura
        const serie = req.body.serie || "F001"; // Toma la serie del body
        const numero = req.body.numero.toString().padStart(8, "0"); // Asegura 8 dígitos
        const fileName = `${ruc}-${tipoDoc}-${serie}-${numero}`;

        // Body CORRECTO para APISUNAT
        const bodyAPISUNAT = {
            personaId: CONFIG.PERSONA_ID,
            personaToken: CONFIG.TOKEN,
            fileName: fileName,
            documentBody: {
                ...req.body // Todos los datos de la factura
            }
        };

        // Enviar a APISUNAT
        const response = await axios.post(CONFIG.URL, bodyAPISUNAT, {
            headers: { "Content-Type": "application/json" }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Error interno",
            detalles: error.response?.data || error.message
        });
    }
});

app.listen(port, () => console.log("✅ Servidor activo"));
