const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/sendBill', async (req, res) => {
    try {
        // Configuración de APISUNAT
        const CONFIG = {
            URL: "https://back.apisunat.com/personas/v1/sendBill",
            TOKEN: "DEV_JCABLBOVCDOH29lPiopwLkFFBAnaUX0TaYGXCzBmpty62XYDkw19VLPJVcI0Z0EV", // Tu token real
            PERSONA_ID: "67d8940738679e0015b3d521" // Tu personaId
        };

        // Generar fileName válido para SUNAT (RUC-TipoDoc-Serie-Número)
        const fileName = `10775725350-01-F001-00000002`; // Usa tu RUC y datos reales

        // Body para APISUNAT (basado en su documentación)
        const bodyAPISUNAT = {
            personaId: CONFIG.PERSONA_ID,
            personaToken: CONFIG.TOKEN,
            fileName: fileName,
            documentBody: {
                "cbc:UBLVersionID": { "_text": "2.1" },
                "cbc:CustomizationID": { "_text": "2.0" },
                "cbc:ID": { "_text": "F001-00000002" },
                "cbc:IssueDate": { "_text": "2025-03-19" }, // Fecha futura válida
                "cbc:IssueTime": { "_text": "20:08:06" },
                "cbc:InvoiceTypeCode": {
                    "_attributes": { "listID": "0101" },
                    "_text": "01"
                },
                "cbc:DocumentCurrencyCode": { "_text": "PEN" },
                "cac:AccountingSupplierParty": {
                    "cac:Party": {
                        "cac:PartyIdentification": {
                            "cbc:ID": {
                                "_attributes": { "schemeID": "6" },
                                "_text": "10775725350" // Tu RUC
                            }
                        },
                        "cac:PartyLegalEntity": {
                            "cbc:RegistrationName": { 
                                "_text": "LOPEZ NEGRON CHRISTIAN MISSUR" // Razón social real
                            }
                        }
                    }
                },
                "cac:AccountingCustomerParty": {
                    "cac:Party": {
                        "cac:PartyIdentification": {
                            "cbc:ID": {
                                "_attributes": { "schemeID": "6" },
                                "_text": "10081541669" // RUC del cliente
                            }
                        }
                    }
                },
                "cac:TaxTotal": {
                    "cbc:TaxAmount": {
                        "_attributes": { "currencyID": "PEN" },
                        "_text": 2.16
                    }
                },
                "cac:LegalMonetaryTotal": {
                    "cbc:PayableAmount": {
                        "_attributes": { "currencyID": "PEN" },
                        "_text": 14.16
                    }
                },
                "cac:InvoiceLine": [
                    {
                        "cbc:ID": { "_text": 1 },
                        "cbc:InvoicedQuantity": {
                            "_attributes": { "unitCode": "NIU" },
                            "_text": 1
                        },
                        "cac:Item": {
                            "cbc:Description": { "_text": "Producto de prueba" } 
                        }
                    }
                ]
            }
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
