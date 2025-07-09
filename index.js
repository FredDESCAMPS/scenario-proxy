const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post("https://api.scenario.com/v1/generation", req.body, {
      headers: {
        Authorization: `Bearer ${process.env.SCENARIO_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erreur proxy :", error.message);
    res.status(500).send("Erreur serveur");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy actif sur le port ${PORT}`);
});
