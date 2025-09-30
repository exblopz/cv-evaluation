const express = require('express');
const { startEvaluation } = require('../controllers/evaluateController');

const router = express.Router();

router.post('/evaluate', startEvaluation);

module.exports = router;
