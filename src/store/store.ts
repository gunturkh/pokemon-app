import create from 'zustand';
import { persist } from 'zustand/middleware';

const usePokemon = create(
  persist(
    (set) => ({
      pokemonDetail: {},
      pokemonList: {},
      myPokemonList: [],
      fetchPokemonList: async (url: string) => {
        const response = await fetch(url);
        set({ pokemonList: await response.json() });
      },
      fetchPokemonDetail: async (url: string) => {
        const response = await fetch(url);
        set({ pokemonDetail: await response.json() });
      },
      capturePokemon: (params: any) => {
        set((state: any) => ({
          myPokemonList: [...state.myPokemonList, params],
        }));
      },
      releasePokemon: (params: any) =>
        set((state: any) => ({
          myPokemonList: state.myPokemonList.filter(
            (item: any) => item.id !== params.id
          ),
        })),
    }),
    { name: 'pokemon-app' }
  )
);
export default usePokemon;
