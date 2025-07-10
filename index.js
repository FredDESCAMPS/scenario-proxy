const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const apiKey = process.env.SCENARIO_API_KEY;

    if (!apiKey) {
      console.error("❗ La variable SCENARIO_API_KEY est introuvable !");
      return res.status(500).json({ error: "Clé API manquante côté serveur." });
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    console.log("🟢 Requête vers Scenario avec headers:", headers);
    console.log("📦 Corps de la requête:", req.body);
    console.log("🔐 Clé API utilisée:", apiKey);

    const response = await axios.post(
      'https://api.cloud.scenario.com/v1/generation',
      req.body,
      { headers }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Erreur proxy :", error.response?.data || error.message);
    res.status(500).json({
      error: 'Erreur lors de la requête vers l\'API Scenario',
      details: error.response?.data || error.message
    });
  }
});

app.listen(port, () => {
  console.log("✅ Proxy actif sur le port " + port);
});
