"use client";

import { useState } from "react";

export default function PokemonSearchList({ initialPokemons }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtering the pokemon based on the search term (case-insensitive)
  const filteredPokemons = initialPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {filteredPokemons.length > 0 ? (
        // If TRUE (length > 0), render the list:
        <ul>
          {filteredPokemons.map((pokemon) => (
            <li key={pokemon.id} className="mb-1">
              {"#${pokemon.id} ${pokemon.name}"}
            </li>
          ))}
        </ul>
      ) : (
        // If FALSE (length is 0), render the message:
        <p className="text-gray-500 italic mt-4">
          No Pokémon found matching your search.
        </p>
      )}
    </div>
  );
}
