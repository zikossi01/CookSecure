import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [userExistsError, setUserExistsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email.";
    if (formData.password.length < 6) newErrors.password = "Password must be 6+ characters.";
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check if the user already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some((user) => user.email === formData.email);

    if (userExists) {
      setUserExistsError(true);
      return;
    }

    const { name, email, password } = formData;
    const newUser = { name, email, password };

    // Save the new user in localStorage
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center font-[Poppins]">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-teal-400 mb-6">Register for CookSecure</h2>
        {userExistsError && <div className="text-red-500 text-center mb-4">User already exists. Try logging in.</div>}
        <form onSubmit={handleSubmit}>
          {["name", "email", "password", "confirmPassword"].map((field, idx) => (
            <div key={idx} className="mb-4">
              <label htmlFor={field} className="block text-sm capitalize">{field.replace("confirmPassword", "Confirm Password")}</label>
              <input
                type={field.includes("password") ? "password" : "text"}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field.replace("confirmPassword", "confirm password")}`}
                className="w-full p-3 bg-gray-700 text-white rounded-lg"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 shadow-md">
            Register
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-teal-400 hover:underline cursor-pointer">Login here</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
