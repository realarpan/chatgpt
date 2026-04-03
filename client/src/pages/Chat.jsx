import { useState,useEffect } from "react";
import API from "../api";
import { Sidebar } from "../components/Sidebar";

export default function Chat(){
  const [conversations,setConversations]=useState([]);
  const [current,setCurrent]=useState(null);
  const [input,setInput]=useState("");

  useEffect(()=>{ fetchChats(); },[]);

  const fetchChats = async()=>{
    const res = await API.get("/chat");
    setConversations(res.data);
  }

  const createChat = async()=>{
    const res = await API.post("/chat/new");
    fetchChats();
    setCurrent(res.data);
  }

  const send = async()=>{
    const res = await API.post(`/chat/${current._id}`,{message:input});
    setCurrent(res.data);
    setInput("");
  }

  return (
    <div className="flex h-screen">
      <Sidebar conversations={conversations} select={setCurrent} create={createChat}/>

      <div className="flex-1">
        {current?.messages?.map((m,i)=>(
          <div key={i}>{m.role}: {m.content}</div>
        ))}

        <input value={input} onChange={e=>setInput(e.target.value)}/>
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
