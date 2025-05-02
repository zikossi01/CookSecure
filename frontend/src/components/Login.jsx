import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isAuthenticated", "true");  // Set the auth token in localStorage
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center font-[Poppins]">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-teal-400 mb-6">Login to CookSecure</h2>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white mb-3 rounded-lg"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white mb-3 rounded-lg"
          />
        </div>
        <button onClick={handleLogin} className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-semibold rounded-lg">
          Login
        </button>
        <div className="text-center mt-6 text-sm text-gray-400">
          Don't have an account? <span onClick={() => navigate("/register")} className="text-teal-400 hover:underline cursor-pointer">Register here</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
