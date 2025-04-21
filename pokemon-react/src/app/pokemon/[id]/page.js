export default async function PokemonDetailPage({ params }) {
  // For a route like /pokemon/25, params will be { id: '25' }
  const id = params.id;

  // For now, just display the Id to confirm it works
  return (
    <main>
      <h1 className="text-2xl font-bold">Pokémon Detail Page</h1>
      <p className="mt-4">Details for Pokémon ID: {id}</p>
      {/* We will fetch and display actual data here later */}
    </main>
  );
}
