const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    console.log("Requête reçue :", req.body);

    const response = await axios.post(
      "https://api.cloud.scenario.com/v1/generate/video", // <-- Le bon endpoint
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.SCENARIO_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Réponse reçue de Scenario ✅", response.data);
    res.json(response.data);

  } catch (error) {
    console.error("Erreur proxy :", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
});

app.listen(port, () => console.log(`Proxy actif sur le port ${port}`));
