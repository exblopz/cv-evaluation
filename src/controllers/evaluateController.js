const { runEvaluation } = require("../services/evaluationService");
const { uploads } = require("./uploadController");

async function evaluate(req, res, next) {
  try {
    const { id } = req.params;
    if (!uploads[id]) {
      return res.status(404).json({ error: "Upload ID not found" });
    }

    const jobId = await runEvaluation(id, uploads[id]);
    res.json({ jobId, status: "processing" });
  } catch (err) {
    next(err);
  }
}

module.exports = { evaluate };  // ✅ export function
