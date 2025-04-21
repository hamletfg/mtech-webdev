// components/PokemonSearchList.js
"use client";

import Image from "next/image";
import Link from "next/link"; // Import the Link component
import { useState } from "react";

export default function PokemonSearchList({ initialPokemons }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPokemons = initialPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokémon..."
        className="mb-4 p-2 border rounded w-full text-black bg-white"
      />

      <ul className="space-y-2">
        {filteredPokemons.map((pokemon) => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

          return (
            // Each list item is now wrapped in a Link
            <Link
              href={`/pokemon/${pokemon.id}`} // Dynamic route using the pokemon's ID
              key={pokemon.id} // Move the key to the Link for proper list rendering
              className="block" // Make the link behave like a block element
            >
              <li
                // No key needed here anymore
                className="flex items-center p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer" // Add cursor-pointer
              >
                <Image
                  src={imageUrl}
                  alt={pokemon.name}
                  width={56}
                  height={56}
                  className="mr-4"
                  unoptimized
                />
                <span className="capitalize text-lg">{pokemon.name}</span>
              </li>
            </Link> // Close the Link tag
          );
        })}
      </ul>
    </div>
  );
}
