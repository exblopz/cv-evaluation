const express = require("express");
const { evaluate } = require("../controllers/evaluateController");

const router = express.Router();

router.post("/evaluate/:id", evaluate);  // ✅ handler adalah function

module.exports = router;
