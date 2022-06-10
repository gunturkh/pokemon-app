import create from 'zustand';
import { persist } from 'zustand/middleware';

const usePokemon = create(
  persist(
    (set) => ({
      pokemonList: [],
      capturePokemon: (params: any) => {
        set((state: any) => ({
          pokemonList: [...state.pokemonList, params],
        }));
      },
      releasePokemon: (params: any) =>
        set((state: any) => ({
          pokemonList: state.pokemonList.filter(
            (item: any) => item.id !== params.id
          ),
        })),
    }),
    { name: 'pokemon-app' }
  )
);
export default usePokemon;
