import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import usePokemon from '@/store/store';

const Index = () => {
  const router = useRouter();
  const pokemonList = usePokemon((state: any) => state.pokemonList);
  const myPokemonList = usePokemon((state: any) => state.myPokemonList);
  const fetchPokemonList = usePokemon((state: any) => state.fetchPokemonList);
  const fetchPokemonDetail = usePokemon(
    (state: any) => state.fetchPokemonDetail
  );

  const [show, setShow] = useState(false);
  useEffect(() => {
    if (Object.keys(pokemonList).length === 0)
      fetchPokemonList('https://pokeapi.co/api/v2/pokemon');
  }, []);
  useEffect(() => {
    if (Object.keys(pokemonList).length > 0) setShow(true);
  }, [pokemonList]);

  return (
    <>
      <div className="mb-4 flex flex-row justify-between bg-slate-800  p-4">
        <h1 className="font-bold text-white">Pokemon App</h1>
        <Link href={'/pokemon-list'}>My Pokemon List</Link>
      </div>
      <div className="p-4">
        <div className="font-bold">
          Pokemon owned: {show ? myPokemonList.length : 'hidden'}
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {show &&
            pokemonList?.results?.map((pokemon: any, index: number) => (
              <div
                className="m-2 flex h-[100px] basis-[300px] cursor-pointer items-center  justify-center rounded-lg border border-slate-300 p-4 text-center  hover:shadow-lg"
                key={index}
                onClick={async () => {
                  await fetchPokemonDetail(pokemon?.url);
                  router.push('/pokemon-detail');
                }}
              >
                {pokemon.name}
              </div>
            ))}
        </div>
        <div className="mt-4 flex flex-row justify-between">
          {pokemonList?.previous !== '' && (
            <button
              className="font-bold"
              onClick={() => fetchPokemonList(pokemonList?.previous)}
            >
              {`<< Previous`}
            </button>
          )}
          {pokemonList?.next !== '' && (
            <button
              className="font-bold"
              onClick={() => fetchPokemonList(pokemonList?.next)}
            >
              {`Next >>`}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
