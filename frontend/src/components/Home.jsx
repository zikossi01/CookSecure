import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { getRecipes } from "../recipeApi";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ setIsAuthenticated }) => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // 🟩 Load recipes from localStorage first, then fetch from API
  useEffect(() => {
    const localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    if (localRecipes.length > 0) {
      setRecipes(localRecipes);
    } else {
      fetchInitialRecipes(); // only call API if no local recipes exist
    }
  }, []);

  const fetchInitialRecipes = async () => {
    const fetchedRecipes = await getRecipes("chicken");
    setRecipes(fetchedRecipes);
  };

  // 🔍 Fetch API recipes if user searches something
  useEffect(() => {
    const fetchRecipesBySearch = async () => {
      const query = searchQuery.trim();
      if (!query) return;
      const fetchedRecipes = await getRecipes(query);
      setRecipes(fetchedRecipes);
    };

    if (searchQuery) {
      fetchRecipesBySearch();
    }
  }, [searchQuery]);

  // ➕ Add a new recipe to the list and localStorage
  const handleAddRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  // ❌ Delete a recipe and update localStorage
  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const handleShowInstructions = (index) => {
    setSelectedRecipe(recipes[index]);
    setShowPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
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
              <li><a href="#" className="text-gray-300 hover:text-teal-400">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-400">Recipes</a></li>
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

      {/* Hero */}
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

      {/* Recipes Section */}
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

      {/* Add Recipe Modal */}
      {isModalOpen && (
        <RecipeModal
          onClose={() => setIsModalOpen(false)}
          onAddRecipe={handleAddRecipe}
        />
      )}

      {/* Instructions Modal */}
      {showPopup && selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl transform scale-95 hover:scale-100 transition-transform duration-500 ease-out w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 relative overflow-hidden backdrop-blur-md">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold transition-colors duration-200"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-teal-600">{selectedRecipe.name}</h2>
            {selectedRecipe.image && (
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="rounded-lg mb-4 w-full h-48 object-cover mx-auto shadow-xl transition-transform duration-300 transform hover:scale-105"
              />
            )}
            <div className="h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-300 transition-all duration-300 ease-in-out">
              <h3 className="text-lg font-semibold mb-2 text-teal-500">Instructions:</h3>
              <p className="text-sm whitespace-pre-wrap text-gray-700">{selectedRecipe.instructions}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8">
        &copy; 2025 CookSecure. Built with flavor and care.
      </footer>
    </div>
  );
};

export default Home;
