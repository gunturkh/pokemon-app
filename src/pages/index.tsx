import usePokemon from '@/store/store';

const Index = () => {
  const pokemonList = usePokemon((state: any) => state.pokemonList);
  const capturePokemon = usePokemon((state: any) => state.capturePokemon);
  const releasePokemon = usePokemon((state: any) => state.releasePokemon);

  console.log('pokemonList', pokemonList);
  return (
    <div>
      <h1>Pokemon App</h1>
      <button onClick={() => capturePokemon({ name: 'bulbasaur', id: 1 })}>
        capture pokemon
      </button>
      <button onClick={() => releasePokemon({ id: 1 })}>release pokemon</button>
    </div>
  );
};

export default Index;
