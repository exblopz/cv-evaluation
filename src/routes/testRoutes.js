const express = require("express");
const { getEmbedding } = require("../services/vectorService");

const router = express.Router();

// Test endpoint untuk cek embedding dari OpenRouter
router.get("/test-embed", async (req, res) => {
  try {
    const text = req.query.text || "Hello OpenRouter";

    const embedding = await getEmbedding(text);

    res.json({
      dims: embedding.length,             // panjang vektor
      preview: embedding.slice(0, 5)      // contoh 5 angka pertama
    });
  } catch (err) {
    console.error("Embedding test error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
