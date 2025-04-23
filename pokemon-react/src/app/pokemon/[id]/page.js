import Image from "next/image";
import Link from "next/link"; // Correctly imported
// --- Import Icons ---
import {
  FaHeart, // For HP
  FaFistRaised, // For Attack
  FaShieldAlt, // For Defense
  FaBolt, // For Special Attack
  FaShieldVirus, // For Special Defense
  FaRunning, // For Speed
} from "react-icons/fa";

function formatStatName(name) {
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
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
}

// --- Helper function/Map to get Stat Icons ---
const statIcons = {
  hp: <FaHeart className='inline mr-1 text-red-500' />,
  attack: <FaFistRaised className='inline mr-1 text-orange-500' />,
  defense: <FaShieldAlt className='inline mr-1 text-blue-500' />,
  "special-attack": <FaBolt className='inline mr-1 text-yellow-500' />,
  "special-defense": <FaShieldVirus className='inline mr-1 text-green-500' />,
  speed: <FaRunning className='inline mr-1 text-purple-500' />,
};

// -- The Page Component ---
export default async function PokemonDetailPage({ params }) {
  const { id } = await params;
  const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const SPECIES_API_URL = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const MAX_STAT_VALUE = 180;

  let pokemonData = null;
  let error = null;

  try {
    const response = await fetch(POKEMON_API_URL);
    if (!response.ok) {
      // Corrected template literal usage in error message
      throw new Error(
        `Failed to fetch Pokémon with ID ${id}. Status: ${response.status}`
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
        {/* CORRECTED: Use the imported Link component */}
        <Link href='/' className='text-blue-500 hover:underline'>
          Back to Pokédex
        </Link>
      </main>
    );
  }

  // --- Render Loading State ---
  if (!pokemonData) {
    // ... (loading state code is fine)
    return (
      <main className='p-8 text-center'>
        <p>Loading Pokémon details...</p>
      </main>
    );
  }

  // --- Extract Data for Render ---
  const name = pokemonData.name;
  const imageUrl = pokemonData.sprites?.front_default || "/placeholder.png";
  const stats = pokemonData.stats;
  const types = pokemonData.types;

  // --- Render Success State ---
  return (
    <main className='p-8 max-w-2xl mx-auto'>
      {/* Back Link */}
      <Link
        href='/'
        className='text-blue-500 hover:underline mb-6 inline-block'
      >
        &larr; Back to Pokédex
      </Link>

      {/* Name, Image, Types */}
      <h1 className='text-4xl font-bold capitalize mb-4 text-center'>{name}</h1>
      <div className='flex justify-center mb-6'>
        <Image
          src={imageUrl}
          alt={`Image of ${name}`}
          width={200}
          height={200}
          priority
          unoptimized
          className='bg-gray-100 dark:bg-gray-700 rounded-lg p-2'
        />
      </div>
      <div className='mb-6 text-center'>
        <h2 className='text-xl font-semibold mb-2'>Type(s)</h2>
        <div className='flex justify-center gap-2'>
          {types.map(({ type }) => (
            <span
              key={type.name}
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize text-white type-${type.name}`}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-4'>Base Stats</h2>
        <ul className='space-y-3'>
          {stats.map((statInfo) => {
            const statName = statInfo.stat.name;
            const baseStat = statInfo.base_stat;
            const barWidth = Math.min((baseStat / MAX_STAT_VALUE) * 100, 100);
            // Get the corresponding icon, default to null if not found
            const IconComponent = statIcons[statName] || null;

            return (
              <li
                key={statName}
                className='grid grid-cols-4 gap-2 items-center'
              >
                {/* --- Stat Name with Icon --- */}
                <span className='font-medium col-span-1 text-right pr-2 flex items-center justify-end'>
                  {IconComponent} {/* Render the icon */}
                  {formatStatName(statName)}: {/* Render the formatted name */}
                </span>

                {/* Stat Value */}
                <span className='font-bold col-span-1 text-left pl-1 w-10'>
                  {baseStat}
                </span>

                {/* Stat Bar */}
                <div className='col-span-2 bg-gray-300 dark:bg-gray-600 rounded-full h-4 overflow-hidden'>
                  <div
                    className='bg-blue-500 h-full'
                    style={{ width: `${barWidth}%` }}
                  ></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
