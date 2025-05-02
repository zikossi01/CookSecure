import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { getRecipes } from "../recipeApi"; // Adjusted import

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search input

  useEffect(() => {
    // Fetch recipes on component mount with a default search term
    const fetchRecipes = async () => {
      const fetchedRecipes = await getRecipes("chicken"); // Default search term
      setRecipes(fetchedRecipes);
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Fetch recipes when search query changes
    if (searchQuery) {
      const fetchSearchedRecipes = async () => {
        const fetchedRecipes = await getRecipes(searchQuery); // Fetch based on search query
        setRecipes(fetchedRecipes);
      };
      fetchSearchedRecipes();
    } else {
      // If searchQuery is empty, reset to the default state (or fetch all recipes)
      const fetchRecipes = async () => {
        const fetchedRecipes = await getRecipes("chicken"); // Default search term
        setRecipes(fetchedRecipes);
      };
      fetchRecipes();
    }
  }, [searchQuery]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  const handleShowInstructions = (index) => {
    alert(recipes[index].instructions);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="fixed w-full bg-opacity-85 backdrop-blur-sm shadow-lg z-50 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text">
            🍳 CookSecure
          </h1>
          <nav>
            <ul className="flex gap-6">
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-teal-400">
                  Login
                </a>
              </li>
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              className="px-4 py-2 rounded-full border border-teal-600 bg-gray-800 text-white placeholder-teal-400 focus:outline-none"
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-teal-700 py-32 text-center pt-36">
        <h2 className="text-4xl font-bold mb-4">Discover & Share Delicious Recipes</h2>
        <p className="text-xl max-w-lg mx-auto mb-8 text-teal-100">
          CookSecure lets you explore and contribute your favorite meals, all in a secure and beautiful platform.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-3 rounded-full text-white font-semibold transform transition-all hover:scale-105"
        >
          Add Recipe
        </button>
      </section>

      {/* Recipe Cards */}
      <section className="py-16 bg-gray-800">
        <h3 className="text-3xl text-center text-white mb-8">Popular Recipes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onDelete={() => handleDeleteRecipe(index)}
                onShowInstructions={() => handleShowInstructions(index)}
              />
            ))
          ) : (
            <p className="text-center text-white">No recipes found. Please try a different search term.</p>
          )}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <RecipeModal
          onClose={() => setIsModalOpen(false)}
          onAddRecipe={handleAddRecipe}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8">
        &copy; 2025 CookSecure. Built with flavor and care.
      </footer>
    </div>
  );
};

export default Home;
