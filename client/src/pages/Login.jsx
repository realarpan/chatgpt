import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/chat");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl w-[350px] text-white">
        
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        <div className="flex flex-col gap-4">
          
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 outline-none placeholder-gray-200"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 outline-none placeholder-gray-200"
          />

          <button
            onClick={login}
            className="bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition"
          >
            Login
          </button>

        </div>

        <p className="text-center text-sm mt-5">
          Don’t have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>

      </div>

    </div>
  );
}
