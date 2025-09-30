const axios = require("axios");

let evaluations = {};

async function runEvaluation(jobId, { cv, project }) {
  evaluations[jobId] = { status: "processing" };

  try {
    const prompt = `
You are a technical evaluator.
Evaluate the following candidate CV and project report.

CV:
${cv}

Project:
${project}

Return a JSON object with:
- cv_match_rate (0-1 float)
- cv_feedback (string)
- project_score (0-10 float)
- project_feedback (string)
- overall_summary (string)
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini", // bisa juga "anthropic/claude-3.5-sonnet" dll
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000", // opsional, untuk tracking
          "X-Title": "AI CV Evaluator"
        }
      }
    );

    const result = JSON.parse(response.data.choices[0].message.content);

    evaluations[jobId] = {
      status: "completed",
      result
    };
  } catch (err) {
    console.error("❌ Evaluation error:", err.response?.data || err.message);
    evaluations[jobId] = {
      status: "failed",
      error: err.message
    };
  }
}

module.exports = { evaluations, runEvaluation };
