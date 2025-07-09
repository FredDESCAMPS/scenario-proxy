const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    console.log("Requête reçue :", req.body);

    const response = await axios.post("https://api.scenario.com/v1/generation", req.body, {
      headers: {
        "Authorization": `Bearer ${process.env.SCENARIO_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Réponse reçue de Scenario ✅");

    res.json(response.data);
  } catch (error) {
    console.error("Erreur proxy :", error.message);
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send("Erreur proxy : " + error.message);
    }
  }
});

app.listen(port, () => {
  console.log(`Proxy actif sur le port ${port}`);
});
