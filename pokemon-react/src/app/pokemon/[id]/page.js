import Image from "next/image";
import Link from "next/link"; // For a back button

// --- Helper function to format stat names ---
function formatStateName(name) {
  switch (name) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Sp. Atk";
    case "special-defense":
      return "Sp. Def";
    case "speed":
      return "Speed";
    default:
      return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize other stats
  }
}

// -- The Page Component ---
export default async function PokemonDetailPage({ params }) {
  // For a route like /pokemon/25, params will be { id: '25' }
  const id = params.id;
  const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const MAX_STAT_VALUE = 180; // Define max for bar calculation

  let pokemonData = null;
  let error = null;

  try {
    const response = await fetch(POKEMON_API_URL);
    if (!response.ok) {
      throw new Error(
        "Failed to fetch Pokémon with ID ${id}. Status: ${response.status}"
      );
    }
    pokemonData = await response.json();
  } catch (err) {
    console.error("Error fetching Pokémon details:", err);
    error = err.message || "Could not load Pokémon data.";
  }

  // --- Render Error State ---
  if (error) {
    return (
      <main className='p-8 text-center'>
        <h1 className='text-2xl font-bold text-red-600 mb-4'>Error</h1>
        <p className='mb-4'>{error}</p>
        <link href='/' className='text-blue-500 hover:underline'>
          Back to Pokédex
        </link>
      </main>
    );
  }

  // --- Render Loading State
  if (!pokemonData) {
    return (
      <main className='p-8 text-center'>
        <p>Loading Pokémon details...</p>
      </main>
    );
  }

  // For now, just display the Id to confirm it works
  return (
    <main>
      <h1 className='text-2xl font-bold'>Pokémon Detail Page</h1>
      <p className='mt-4'>Details for Pokémon ID: {id}</p>
      {/* We will fetch and display actual data here later */}
    </main>
  );
}
