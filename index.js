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
    res.status(response.status).json(response.data);
  } catch (e) {
    console.error("Proxy error:", e.response?.data || e.message);
    res.status(e.response?.status || 500).json({ error: e.response?.data || e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy actif sur le port ${port}`));
