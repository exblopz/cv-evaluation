const { ChromaClient } = require("chromadb");
const OpenAI = require("openai");
const { OPENROUTER_API_KEY, OPENAI_API_KEY } = require("../config/env");

// OpenRouter setup
const openai = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const client = new ChromaClient();

let cvCollection;
let projectCollection;

// init collections
async function initCollections() {
  if (!cvCollection) {
    cvCollection = await client.createCollection({ 
      name: "cvs",
      embeddingFunction: null   // 🚀 penting, jangan pakai default embed
    });
  }
  if (!projectCollection) {
    projectCollection = await client.createCollection({ 
      name: "projects",
      embeddingFunction: null   // 🚀
    });
  }
  return { cvCollection, projectCollection };
}


async function getEmbedding(text) {
  const resp = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral/mistral-embed",   // atau cohere/embed-multilingual-v3.0
      input: text,
    }),
  });

  if (!resp.ok) {
    throw new Error(`OpenRouter request failed: ${resp.status} ${resp.statusText}`);
  }

  const data = await resp.json();
  if (!data.data || data.data.length === 0) {
    throw new Error("No embedding returned from OpenRouter");
  }

  return data.data[0].embedding;
}

// simpan CV
async function saveCV(id, text) {
  const { cvCollection } = await initCollections();
  const embedding = await getEmbedding(text);

  await cvCollection.add({
    ids: [id],
    embeddings: [embedding],
    documents: [text],
  });

  return { id, message: "CV stored in vector DB" };
}

// simpan Project Report
async function saveProject(id, text) {
  const { projectCollection } = await initCollections();
  const embedding = await getEmbedding(text);

  await projectCollection.add({
    ids: [id],
    embeddings: [embedding],
    documents: [text],
  });

  return { id, message: "Project stored in vector DB" };
}

// cari CV berdasarkan query
async function searchCV(queryText, topK = 2) {
  const { cvCollection } = await initCollections();
  const queryEmbedding = await getEmbedding(queryText);

  const results = await cvCollection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: topK,
  });

  return results;
}

// cari Project berdasarkan query
async function searchProject(queryText, topK = 2) {
  const { projectCollection } = await initCollections();
  const queryEmbedding = await getEmbedding(queryText);

  const results = await projectCollection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: topK,
  });

  return results;
}


async function resetCollections() {
  try {
    await client.deleteCollection({ name: "cvs" });
  } catch (e) {
    console.log("No existing cvs collection to delete");
  }

  try {
    await client.deleteCollection({ name: "projects" });
  } catch (e) {
    console.log("No existing projects collection to delete");
  }

  cvCollection = null;
  projectCollection = null;
}

module.exports = { saveCV, saveProject, searchCV, searchProject, resetCollections, getEmbedding };
