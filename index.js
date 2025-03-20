const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/sendBill', async (req, res) => {
    try {
        const CONFIG = {
            URL: "https://back.apisunat.com/personas/v1/sendBill",
            TOKEN: "DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV",
            PERSONA_ID: "67d8940738679e0015b3d521"
        };

        // RUC REAL y formato SUNAT ✅
        const ruc = "10775725350"; 
        const tipoDoc = "01"; 
        const serie = req.body.serie.padStart(4, "0"); // Ej: "F001"
        const numero = req.body.numero.toString().padStart(8, "0"); // 8 dígitos
        const fileName = `${ruc}-${tipoDoc}-${serie}-${numero}`;

        const bodyAPISUNAT = {
            personaId: CONFIG.PERSONA_ID,
            personaToken: CONFIG.TOKEN,
            fileName: fileName,
            documentBody: req.body
        };

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

app.listen(port, () => console.log("✅ Servidor listo"));
