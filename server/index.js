import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import chat from "./routes/chat.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ ADD THESE ROUTES (for testing)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/api", (req, res) => {
  res.send("API working ✅");
});

// routes
app.use("/auth", auth);
app.use("/chat", chat);

// DB + server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log("Server running"));
});
