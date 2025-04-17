// Make the function async so we can use the await
export default async function Page() {
  // 1. Fetch data from the PokéAPI
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

  // 2. Check if the fetch was successful
  if (!response.ok) {
    console.error("Failed to fetch Pokémon");
    return (
      <main>
        <p>Error loading Pokémon!</p>
      </main>
    );
  }

  // 3. Parse the response body as JSON
  const data = await response.json();

  // 4. Extract the list of Pokémon (the 'results' array)
  const pokemons = data.results;

  // 5. Render the list
  return (
    <main style={{ padding: "2rem" }}>
      <h1>My Pokédex</h1>
      <ul>
        {pokemons.map((pokemon) => (
          // React needs a unique 'key' to prop when rendering lists
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </main>
  );
}
