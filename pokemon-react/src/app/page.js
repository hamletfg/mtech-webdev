import PokemonSearchList from "@/components/PokemonSearchList";

export default async function Page() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

  if (!response.ok) {
    console.error("Failed to fetch Pokémon");
    return (
      <main className="p-8">
        <p>Error loading Pokémon data!</p>
      </main>
    );
  }

  const data = await response.json();
  const rawPokemons = data.results; // Rename to map out and get ID

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

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Pokédex</h1>
      <PokemonSearchList initialPokemons={formattedPokemons} />
    </main>
  );
}
