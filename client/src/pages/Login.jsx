import React from "react";
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const login = async()=>{
    const res = await API.post("/auth/login",{email,password});
    localStorage.setItem("token",res.data.token);
    navigate("/chat");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 shadow rounded">
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
