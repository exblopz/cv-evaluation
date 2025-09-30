const express = require('express');
const { getResult } = require('../controllers/resultController');

const router = express.Router();

router.get('/result/:id', getResult);

module.exports = router;
