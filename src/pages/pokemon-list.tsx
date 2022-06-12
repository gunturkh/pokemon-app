import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import type { Pokemon } from '@/_prototype';
import usePokemon from '@/store/store';

const DeleteInactiveIcon = (props: any) => {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
};

function DeleteActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}
const MenuButton = ({ pokemon }: { pokemon: Partial<Pokemon> }) => {
  const releasePokemon = usePokemon((state: any) => state.releasePokemon);

  return (
    <div className="top-16 w-56">
      <Menu as={'div'} className="relative inline-block text-left">
        <div>
          <Menu.Button className="mt-4 inline-flex w-full justify-center rounded-md bg-slate-800  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Actions
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      console.log('release pokemon', pokemon.id);
                      releasePokemon({ aid: pokemon?.aid });
                    }}
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    )}
                    Release Pokemon
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const PokemonListPage = () => {
  const [showList, setShowList] = useState(false);
  const myPokemonList = usePokemon((state: any) => state.myPokemonList);
  useEffect(() => {
    if (myPokemonList.length > 0) setShowList(true);
  }, [myPokemonList]);

  return (
    <div>
      <div className="mb-4 flex flex-row justify-between bg-slate-800 p-4">
        <h1 className="font-bold text-white">My Pokemon List</h1>
        <Link href={'/'}>Pokemon List</Link>
      </div>
      <div className="p-4">
        <div className="md: flex flex-row flex-wrap items-center justify-center sm:justify-start ">
          {showList &&
            myPokemonList?.map((pokemon: Pokemon, index: number) => (
              <div
                key={`pokemon-${pokemon.name}-${index}`}
                className="m-2 flex h-auto max-w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg p-4 text-center shadow-md hover:shadow-lg"
              >
                <img
                  src={pokemon?.sprites?.front_default}
                  alt={pokemon?.name}
                />
                <div>Name: {pokemon.name}</div>
                <div>Nickname: {pokemon.nickname}</div>
                <MenuButton pokemon={pokemon} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default PokemonListPage;
