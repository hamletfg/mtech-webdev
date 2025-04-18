// src/components/PokemonSearchList.js
"use client";

import { useState } from "react";

export default function PokemonSearchList({ initialPokemons }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtering logic will go here soon
  const filteredPokemons = initialPokemons; // Placeholder

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleInputChange}
        // Replace inline style with Tailwind className
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs" // <-- Tailwind classes
        // Added w-full and max-w-xs for better width control
      />

      {/* We might style the list later too, e.g., with list-disc ml-5 */}
      <ul>
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.name} className="mb-1">
            {" "}
            {/* Basic margin between list items */}
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
