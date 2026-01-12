import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sessionId: String,
  messages: [
    {
      sender: String,
      text: String,
      time: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("Chat", chatSchema);
