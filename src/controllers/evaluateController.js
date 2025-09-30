const { v4: uuidv4 } = require('uuid');
const { uploads } = require('./uploadController');
const { evaluations, runEvaluation } = require('../services/evaluationService');

function startEvaluation(req, res, next) {
  try {
    const { uploadId } = req.body;
    if (!uploadId || !uploads[uploadId]) {
      return res.status(400).json({ error: 'Invalid uploadId' });
    }

    const jobId = uuidv4();
    evaluations[jobId] = { status: 'queued', uploadId };

    // Simulasi evaluasi (async)
    runEvaluation(jobId, uploads[uploadId]);

    res.json({ id: jobId, status: 'queued' });
  } catch (err) {
    next(err);
  }
}

module.exports = { startEvaluation };
