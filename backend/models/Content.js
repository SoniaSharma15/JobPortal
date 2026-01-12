import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  page: String,
  text: String,
  embedding: [Number]
});

export default mongoose.model("Content", contentSchema);
