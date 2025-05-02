// src/recipeApi.js
export const getRecipes = async (query) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();

    if (!data.meals) return [];

    // Map API response to your recipe format
    return data.meals.map((meal) => ({
      name: meal.strMeal,
      author: meal.strArea || "Unknown", // You can change this
      instructions: meal.strInstructions,
      image: meal.strMealThumb,
    }));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
