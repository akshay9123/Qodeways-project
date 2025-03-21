"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter an email and password");
      return;
    }

    try {
      await axios.post("/api/login", { email, password }, { headers: { "Content-Type": "application/json" } });
      router.push("/admin"); // Redirect to dashboard after login
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="p-5 bg-gray-200 flex flex-col gap-6 max-w-lg mx-auto">
      {/* Heading */}
      <div className="text-center font-bold">
        <h1 className="text-2xl">Login</h1>
        <h2 className="text-lg">Access Your Account</h2>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Email */}
      <input 
        type="email" 
        placeholder="Email Address" 
        required 
        className="w-full border-2 border-black p-2 rounded-lg" 
        onChange={(e) => setEmail(e.target.value)} 
      />

      {/* Password */}
      <input 
        type="password" 
        placeholder="Password" 
        required 
        className="w-full border-2 border-black p-2 rounded-lg" 
        onChange={(e) => setPassword(e.target.value)} 
      />

      {/* Submit Button */}
      <div className="flex justify-center">
        <button 
          className="border-2 border-blue-500 bg-blue-500 text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-blue-600" 
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
