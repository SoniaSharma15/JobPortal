import Document from "../models/Document.js";
import { getEmbedding } from "../utils/getEmbedding.js";
import { askOllama } from "../utils/ollamaChat.js";


export const handleChat = async (req, res) => {
try {
const { message } = req.body;


// 1. Embed user query
const queryEmbedding = await getEmbedding(message);


// 2. Find similar docs (simple cosine logic placeholder)
const docs = await Document.find().limit(3);


const context = docs.map(d => d.content).join("\n");


// 3. Prompt with context
const finalPrompt = `
You are BrilliantBihar website assistant.
Answer ONLY from the context.


Context:${context}


Question:
${message}
`;


const reply = await askOllama(finalPrompt);


res.json({ reply });
} catch (err) {
console.error(err);
res.status(500).json({ reply: "Server error" });
}
};