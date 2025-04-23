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

  let pokemonData = null; // Variable for pokemon data
  let speciesData = null; // Variable for species data
  let error = null;

  try {
    // --- Fetch both endpoints concurrently ---
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(POKEMON_API_URL),
      fetch(SPECIES_API_URL),
    ]);

    // Check both responses
    if (!pokemonRes.ok) {
      throw new Error(
        `Failed to fetch Pokémon data. Status: ${pokemonRes.status}`
      );
    }
    if (!speciesRes.ok) {
      throw new Error(
        `Failed to fetch Pokémon species data. Status ${speciesRes.status}. Some details might be missing.`
      );
    }

    pokemonData = await pokemonRes.json();
    // Only parse species JSON if the request was successful
    if (speciesRes.ok) {
      speciesData = await speciesRes.json();
    }
  } catch (err) {
    console.error("Error fetching Pokémon details:", err);
    // Prioritize showing the main error
    error = err.message || "Could not load Pokémon data.";
  }

  // --- Render Error State (if main fetch failed) ---
  if (error && !pokemonData) {
    // Only show full error if main data failed
    return (
      <main className='p-8 text-center'>
        <h1 className='text-2xl font-bold text-red-600 mb-4'>Error</h1>
        <p className='mb-4'>{error}</p>
        <Link href='/' className='text-blue-500 hover:underline'>
          Back to Pokédex
        </Link>
      </main>
    );
  }

  // --- Render Loading State ---
  if (!pokemonData) {
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
  const abilities = pokemonData.abilities; // Array: [{ ability: { name: 'overgrow', url: '...' }, is_hidden: false, slot: 1 }, ...]
  const height = pokemonData.height; // Height in decimetres
  const weight = pokemonData.weight; // Weight in hectograms

  // --- Extract Flavor Text (find first English entry) ---
  let flavorText = "No description available."; // Default text
  if (speciesData?.flavor_text_entries) {
    const englishEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    if (englishEntry) {
      // Clean up flavor text (replace newlines, form feeds, etc.)
      flavorText = englishEntry.flavor_text.replace(/[\n\f]/g, " ");
    }
  }

  // --- Render Success State ---
  return (
    <main className='p-8 max-w-2xl mx-auto'>
      {/* Back Link, Name, Image, Types (remain the same) */}
      <Link
        href='/'
        className='text-blue-500 hover:underline mb-6 inline-block'
      >
        &larr; Back to Pokédex
      </Link>
      <h1 className='text-4xl font-bold capitalize mb-4 text-center'>{name}</h1>
      <div className='flex justify-center mb-6'>
        <Image
          src={imageUrl} // Pass the calculated imageUrl
          alt={`Image of ${name}`} // Set alt text using the Pokémon's name
          width={200} // Specify width
          height={200} // Specify height
          priority // Keep priority if it's above the fold
          unoptimized // Keep if needed for external URLs
          className='bg-gray-100 dark:bg-gray-700 rounded-lg p-2' // Styling
        />
      </div>
      <div className='mb-6 text-center'>
        {" "}
        {/* Types Section */}
        <h2 className='text-xl font-semibold mb-2'>Type(s)</h2>
        {/* ... Types rendering ... */}
      </div>

      {/* --- NEW: Physical Characteristics --- */}
      <div className='text-center mb-6 grid grid-cols-2 gap-4'>
        <div>
          <h2 className='text-xl font-semibold mb-1'>Height</h2>
          {/* Convert decimetres to meters */}
          <p>{(height / 10).toFixed(1)} m</p>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-1'>Weight</h2>
          {/* Convert hectograms to kilograms */}
          <p>{(weight / 10).toFixed(1)} kg</p>
        </div>
      </div>

      {/* --- NEW: Flavor Text / Description --- */}
      <div className='mb-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200'>
          Pokédex Entry
        </h2>
        <p className='text-base italic'>{flavorText}</p>
      </div>

      {/* --- NEW: Abilities Section --- */}
      <div className='mb-6 bg-green-50 dark:bg-green-900 p-4 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-2 text-green-800 dark:text-green-200'>
          Abilities
        </h2>
        <ul className='list-disc list-inside'>
          {abilities.map(({ ability, is_hidden }) => (
            <li key={ability.name} className='capitalize'>
              {ability.name.replace("-", " ")}{" "}
              {/* Replace hyphens for readability */}
              {is_hidden && (
                <span className='text-xs font-normal italic text-gray-500 ml-2'>
                  (Hidden Ability)
                </span>
              )}
            </li>
          ))}
        </ul>
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
