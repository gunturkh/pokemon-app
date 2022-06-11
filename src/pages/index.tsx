import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import usePokemon from '@/store/store';

const Index = () => {
  const router = useRouter();
  const pokemonList = usePokemon((state: any) => state.pokemonList);
  const myPokemonList = usePokemon((state: any) => state.myPokemonList);
  const fetchPokemonList = usePokemon((state: any) => state.fetchPokemonList);
  const fetchPokemonDetail = usePokemon(
    (state: any) => state.fetchPokemonDetail
  );

  console.log('pokemonList', pokemonList);
  console.log('myPokemonList', myPokemonList);
  useEffect(() => {
    if (Object.keys(pokemonList).length === 0)
      fetchPokemonList('https://pokeapi.co/api/v2/pokemon');
  }, []);

  return (
    <div>
      <h1>Pokemon App</h1>
      {pokemonList?.results?.length > 0 &&
        pokemonList?.results?.map((pokemon: any, index: number) => (
          <div
            className="cursor-pointer"
            key={index}
            onClick={async () => {
              await fetchPokemonDetail(pokemon?.url);
              router.push('/pokemon-detail');
            }}
          >
            {pokemon.name}
          </div>
        ))}
      <div className="flex flex-row justify-between">
        {pokemonList?.previous !== '' && (
          <button onClick={() => fetchPokemonList(pokemonList?.previous)}>
            previous
          </button>
        )}
        {pokemonList?.next !== '' && (
          <button onClick={() => fetchPokemonList(pokemonList?.next)}>
            next
          </button>
        )}
      </div>
      <div className="flex flex-row justify-between">
        <Link href={'/pokemon-list'}>Go to Pokemon List Page</Link>
      </div>
    </div>
  );
};

export default Index;
