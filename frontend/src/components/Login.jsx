import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-teal-700 font-[Poppins]">
      <div className="bg-black bg-opacity-70 p-8 rounded-xl shadow-2xl w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold text-center mb-8">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="w-full p-4 mb-6 rounded-lg border border-teal-300 bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:border-green-400"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-4 mb-6 rounded-lg border border-teal-300 bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:border-green-400"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-4 rounded-full bg-gradient-to-r from-teal-300 to-green-500 text-white font-semibold text-lg hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p>
            Don't have an account?{' '}
            <a href="/register" className="text-teal-300 font-semibold hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
