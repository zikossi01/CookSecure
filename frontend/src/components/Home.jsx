import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { getRecipes } from "../recipeApi";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Home.css";

const Home = ({ setIsAuthenticated }) => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize navigate function for redirection

  // Initial fetch with default search
  useEffect(() => {
    const fetchInitialRecipes = async () => {
      const fetchedRecipes = await getRecipes("chicken");
      setRecipes(fetchedRecipes);
    };
    fetchInitialRecipes();
  }, []);

  // Fetch recipes based on search
  useEffect(() => {
    const fetchRecipesBySearch = async () => {
      const query = searchQuery.trim() || "chicken";
      const fetchedRecipes = await getRecipes(query);
      setRecipes(fetchedRecipes);
    };
    fetchRecipesBySearch();
  }, [searchQuery]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const handleDeleteRecipe = (index) => {
    setRecipes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleShowInstructions = (index) => {
    alert(recipes[index].instructions);
  };

  // Logout function to clear localStorage and redirect to login page
  const handleLogout = () => {
    setIsAuthenticated(false); // Update the authentication state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header with Navbar */}
      <header className="fixed w-full bg-opacity-85 backdrop-blur-sm shadow-lg z-50 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text">
            🍳 CookSecure
          </h1>

          <nav>
            <ul className="flex gap-6">
              <li><a href="#" className="text-gray-300 hover:text-teal-400">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-400">Recipes</a></li>
              {/* If authenticated, show Logout button */}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-teal-400"
                >
                  Logout
                </button>
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="Hbackground bg-gradient-to-r from-blue-800 to-teal-700 text-center py-32">
        <h2 className="text-4xl font-bold mb-4">Discover & Share Delicious Recipes</h2>
        <p className="text-xl max-w-lg mx-auto mb-8 text-teal-100">
          CookSecure lets you explore and contribute your favorite meals, all in a secure and beautiful platform.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-3 mb-8 rounded-full text-white font-semibold transform transition-all hover:scale-105"
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
            <p className="text-center text-white col-span-full">
              No recipes found. Please try a different search term.
            </p>
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
