import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import chat from "./routes/chat.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth",auth);
app.use("/chat",chat);

mongoose.connect(process.env.MONGO_URI).then(()=>{
  app.listen(5000,()=>console.log("Server running"));
});
