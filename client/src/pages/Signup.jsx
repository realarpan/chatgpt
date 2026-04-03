import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await API.post("/auth/signup", { email, password });
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl w-[350px] text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/20 border border-white/30 outline-none focus:ring-2 focus:ring-white"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signup}
            className="bg-white text-black font-semibold p-3 rounded-lg"
          >
            Signup
          </motion.button>

        </div>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
