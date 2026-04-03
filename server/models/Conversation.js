import mongoose from "mongoose";
export default mongoose.model("Conversation", new mongoose.Schema({
  title:String,
  messages:[{role:String,content:String}]
}));
