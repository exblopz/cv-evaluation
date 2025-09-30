const express = require("express");
const { searchCV, searchProject } = require("../services/vectorService");

const router = express.Router();

router.get("/search/cv", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query required" });

    const results = await searchCV(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed", detail: err.message });
  }
});

router.get("/search/project", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query required" });

    const results = await searchProject(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed", detail: err.message });
  }
});

module.exports = router;
