import PokemonSearchList from "@/components/PokemonSearchList";
import PaginationControls from "@/components/PaginationControls";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  let { page } = await searchParams;
  // --- Pagination Logic ---
  page = parseInt(page || "1"); // Get page from URL, default to 1
  const limit = 20; // Limit Pokémon to 20 per page
  const offset = (page - 1) * limit; // Calculate offset for API

  // --- Fetch Data ---
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    console.error("Failed to fetch Pokémon");
    return (
      <main className='p-8'>
        <p>Error loading Pokémon data!</p>
      </main>
    );
  }

  const data = await response.json();
  const rawPokemons = data.results; // Rename to map out and get ID
  const totalPokemon = data.count; // Get total count for pagination logic

  // Determine if there are next/previous pages
  const hasNextPage = offset + limit < totalPokemon;
  const hasPrevPage = page > 1;

  // --- Transformation Step ---
  const formattedPokemons = rawPokemons.map((pokemon) => {
    // 1. Get the URL: e.g., "https://pokeapi.co/api/v2/pokemon/1/"
    const url = pokemon.url;
    // 2. Split by '/': ["https:", "", "pokeapi.co", ..., "1", ""]
    const parts = url.split("/");
    // 3. Get the ID (index 6): "1"
    const id = parts[6];

    // 4. Return a new object with the desired shape
    return {
      id: id, // Add the extracted ID
      name: pokemon.name, // Keep the original name
    };
  });
  // Now formattedPokemons is an array like: [{ id: '1', name: 'bulbasaur' }, { id: '2', name: 'ivysaur' }, ...]

  // --- Render Page ---
  return (
    <main className='p-8'>
      <h1 className='text-3xl font-bold mb-4'>My Pokédex (Page {page})</h1>

      {/* Pass the fetched Pokémon for the current page */}
      <PokemonSearchList initialPokemons={formattedPokemons} />

      {/* --- Add Pagination Controls --- */}
      <PaginationControls
        currentPage={page}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </main>
  );
}
