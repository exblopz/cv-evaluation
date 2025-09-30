const express = require('express');
const uploadRoutes = require('./routes/uploadRoutes');
const evaluateRoutes = require('./routes/evaluateRoutes');
const resultRoutes = require('./routes/resultRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Routes
app.use('/', uploadRoutes);
app.use('/', evaluateRoutes);
app.use('/', resultRoutes);

// Error handler (global)
app.use(errorHandler);

module.exports = app;
