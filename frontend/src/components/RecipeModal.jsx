import React, { useState } from "react";

function RecipeModal({ onClose, onAddRecipe }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { name, author, instructions, image };
    onAddRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-96 max-w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl"
        >
          &times;
        </button>
        <h3 className="text-2xl font-semibold text-center text-teal-400 mb-6">
          Add a New Recipe
        </h3>
        <form id="recipeForm" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-teal-400"
            required
          />
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-teal-400"
            required
          />
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-teal-400"
            required
          />
          <input
            type="url"
            placeholder="Recipe Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-teal-400"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-teal-500 rounded-full text-white font-semibold hover:bg-teal-600 transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecipeModal;
