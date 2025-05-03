import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load saved email/password on mount
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth === "true") navigate("/home");

    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, [navigate]);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center font-[Poppins]">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-teal-400 mb-6">
          Login to CookSecure
        </h2>
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
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
          className="w-full p-3 bg-gray-700 text-white mb-6 rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-semibold rounded-lg"
        >
          Login
        </button>
        <div className="text-center mt-6 text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-400 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
