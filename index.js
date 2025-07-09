const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080; // ← ici, on écoute le port 8080 ou celui donné par Railway

app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.cloud.scenario.com/v1/generation",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.SCENARIO_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erreur proxy :", error?.response?.data || error.message);
    res.status(500).json({
      error: "Erreur lors de la requête vers l'API Scenario",
      details: error?.response?.data || error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy actif sur le port ${port}`);
});
