import mongoose from "mongoose";


const documentSchema = new mongoose.Schema({
content: String,
embedding: {
type: [Number],
index: "2dsphere" // or vector index (Atlas)
},
source: String
}, { timestamps: true });


export default mongoose.model("Document", documentSchema);