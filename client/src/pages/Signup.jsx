import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const signup = async()=>{
    await API.post("/auth/signup",{email,password});
    navigate("/");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 shadow rounded">
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={signup}>Signup</button>
      </div>
    </div>
  );
}
