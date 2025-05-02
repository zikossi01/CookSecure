import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("isAuthenticated");
    const existingUser = localStorage.getItem("user");

    if (authToken) setIsAuthenticated(true);
    if (existingUser) setUserExists(true);
  }, []);

  return (
    <Router>
      <div className="font-sans bg-gray-50 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              userExists ? (
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                <Navigate to="/register" />
              )
            }
          />

          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
