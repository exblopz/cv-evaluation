const { evaluations } = require('../services/evaluationService');

function getResult(req, res, next) {
  try {
    const jobId = req.params.id;
    if (!evaluations[jobId]) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ id: jobId, ...evaluations[jobId] });
  } catch (err) {
    next(err);
  }
}

module.exports = { getResult };
