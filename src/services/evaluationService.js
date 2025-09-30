const { v4: uuidv4 } = require("uuid");
const OpenAI = require("openai");
const { OPENROUTER_API_KEY } = require("../config/env");

const openrouter = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Simpan hasil evaluasi di memory
let evaluations = {};

async function runEvaluation(uploadId, { cv, project }) {
  const jobId = uuidv4();

  // Tandai status awal
  evaluations[jobId] = {
    status: "processing",
    result: null,
  };

  try {
    // Kirim ke OpenRouter model beneran
    const response = await openrouter.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // ✅ model gratis di OpenRouter
      messages: [
        {
          role: "system",
          content:
            "You are an evaluator of CVs and project reports. Give feedback in JSON with fields: cv_feedback, project_feedback, overall_summary.",
        },
        {
          role: "user",
          content: `Here is a CV:\n${cv}\n\nAnd here is a Project Report:\n${project}\n\nPlease evaluate and return JSON.`,
        },
      ],
    });

    const raw = response.choices[0].message.content;

    // Coba parse JSON, fallback ke string biasa kalau gagal
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { feedback: raw };
    }

    evaluations[jobId] = {
      status: "completed",
      result: parsed,
    };
  } catch (err) {
    console.error("Evaluation error:", err.message);
    evaluations[jobId] = {
      status: "failed",
      error: err.message,
    };
  }

  return jobId;
}

module.exports = { evaluations, runEvaluation };
