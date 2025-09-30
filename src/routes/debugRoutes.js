const express = require("express");
const { resetCollections } = require("../services/vectorService");

const router = express.Router();

// reset vector db collections
router.post("/reset-db", async (req, res) => {
  try {
    await resetCollections();
    res.json({ message: "✅ Collections cvs & projects deleted and reset." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset collections", detail: err.message });
  }
});

module.exports = router;
