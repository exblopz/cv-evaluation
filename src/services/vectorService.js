const { ChromaClient } = require("chromadb");
const OpenAI = require("openai");

const client = new ChromaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let collection;

// init collection
async function initCollection() {
  if (!collection) {
    collection = await client.createCollection({ name: "cvs" });
  }
  return collection;
}

// generate embedding pakai OpenAI
async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });
  return response.data[0].embedding;
}

// simpan CV ke Vector DB
async function saveCV(id, text) {
  const col = await initCollection();
  const embedding = await getEmbedding(text);

  await col.add({
    ids: [id],
    embeddings: [embedding],
    documents: [text]
  });

  return { id, message: "CV stored in vector DB" };
}

// query similarity
async function searchCV(queryText, topK = 2) {
  const col = await initCollection();
  const queryEmbedding = await getEmbedding(queryText);

  const results = await col.query({
    queryEmbeddings: [queryEmbedding],
    nResults: topK
  });

  return results;
}

module.exports = { saveCV, searchCV };
