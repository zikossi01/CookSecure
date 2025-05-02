// src/api.js
import axios from "axios";

const API_KEY = "d332c9d970e44aaa9b03829f3524ccd0";
const BASE_URL = "https://api.spoonacular.com";  // Assuming you're using Spoonacular API

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: "pasta", // You can change this to any search term
        number: 5, // Limit the number of recipes
      },
    });
    return response.data.results; // Returns the list of recipes
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
