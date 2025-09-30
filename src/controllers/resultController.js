const { evaluations } = require("../services/evaluationService");

async function getResult(req, res, next) {
  try {
    const { id } = req.params;
    if (!evaluations[id]) {
      return res.status(404).json({ error: "Job ID not found" });
    }

    res.json(evaluations[id]);
  } catch (err) {
    next(err);
  }
}

module.exports = { getResult };
