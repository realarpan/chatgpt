import express from "express";
import OpenAI from "openai";
import Conversation from "../models/Conversation.js";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get("/", async(req,res)=>{
  res.json(await Conversation.find());
});

router.post("/new", async(req,res)=>{
  res.json(await Conversation.create({title:"New Chat",messages:[]}));
});

router.post("/:id", async(req,res)=>{
  const chat = await Conversation.findById(req.params.id);
  chat.messages.push({role:"user",content:req.body.message});

  const completion = await openai.chat.completions.create({
    model:"gpt-4o-mini",
    messages:chat.messages
  });

  const reply = completion.choices[0].message.content;
  chat.messages.push({role:"assistant",content:reply});

  await chat.save();
  res.json(chat);
});

export default router;
