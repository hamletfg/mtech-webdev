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
  const pokemons = data.results;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Pokédex</h1>
      <PokemonSearchList initialPokemons={pokemons} />
    </main>
  );
}
