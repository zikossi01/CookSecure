import React from "react";

function RecipeCard({ recipe, onDelete, onShowInstructions }) {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transform transition-all hover:translate-y-2">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-56 object-cover filter brightness-75"
      />
      <div className="p-4">
        <h4 className="text-xl text-teal-400">{recipe.name}</h4>
        <p className="text-gray-400">By {recipe.author}</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onShowInstructions}
            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-400"
          >
            Show Instructions
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
