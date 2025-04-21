"use client"; // Needed for useState if/when we add search functionality

import Image from "next/image"; // Import the optimized Image component
import { useState } from "react"; // Import useState for future search functionality

export default function PokemonSearchList({ initialPokemons }) {
  // --- State for Search (we'll implement the filtering logic later) ---
  const [searchTerm, setSearchTerm] = useState("");

  // --- Filtering Logic (placeholder for now, just uses initial list) ---
  // In a future step, we'll filter initialPokemons based on searchTerm
  const filteredPokemons = initialPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* --- Search Input --- */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokémon..."
        className="mb-4 p-2 border rounded w-full text-black bg-white" // Added text-black and bg-white for visibility
      />

      {/* --- Pokémon List --- */}
      <ul className="space-y-2">
        {" "}
        {/* Add some space between list items */}
        {filteredPokemons.map((pokemon) => {
          // Construct the image URL using the Pokémon's ID
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

          return (
            <li
              key={pokemon.id}
              className="flex items-center p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" // Basic styling and hover effect
            >
              {/* --- Pokémon Image --- */}
              <Image
                src={imageUrl}
                alt={pokemon.name} // Important for accessibility
                width={56} // Specify width (e.g., 56px)
                height={56} // Specify height (e.g., 56px)
                className="mr-4" // Add margin to the right of the image
                unoptimized // Optional: If you have issues with external domains or want raw images
              />

              {/* --- Pokémon Name --- */}
              <span className="capitalize text-lg">
                {" "}
                {/* Capitalize the first letter and make text larger */}
                {pokemon.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
