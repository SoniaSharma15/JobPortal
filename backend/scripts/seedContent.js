import connectDB from "../utils/db.js";
import Content from "../models/Content.js";
import { createEmbedding } from "../utils/embeddings.js";

await connectDB();

const data = [
  {
    page: "about",
    text: "BrilliantBihar provides SSC, Banking and Bihar exam coaching."
  },
  {
    page: "courses",
    text: "Courses include SSC, Banking, BPSC with expert teachers."
  }
];

for (const d of data) {
  const embedding = await createEmbedding(d.text);
  await Content.create({ ...d, embedding });
}

console.log("Website content embedded");
process.exit();
