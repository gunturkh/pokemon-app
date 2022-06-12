import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

import usePokemon from '@/store/store';

const CapturePokemonModal = ({
  isOpen,
  closeModal,
  capturePokemon,
  pokemonDetail,
  pokemonNickName,
  randomizeCaptureStatus,
  setPokemonNickName,
}: {
  isOpen: boolean;
  closeModal: () => void;
  capturePokemon: (param: any) => void;
  pokemonDetail: any;
  pokemonNickName: string;
  randomizeCaptureStatus: () => 'success' | 'failed';
  setPokemonNickName: (nickName: string) => void;
}) => {
  const [captureStatus, setCaptureStatus] = useState<'success' | 'failed'>(
    'failed'
  );

  const handleClose = () => {
    setCaptureStatus('failed');
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {captureStatus === 'success' ? (
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Capture Pokemon Success!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="pb-4 text-sm text-gray-500">
                      Please give your pokemon a nickname!
                    </p>
                    <input
                      type="text"
                      className="w-full bg-slate-200"
                      onChange={(e) => setPokemonNickName(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        capturePokemon({
                          ...pokemonDetail,
                          nickname: pokemonNickName,
                          aid: new Date().getTime(),
                        });
                        closeModal();
                      }}
                    >
                      Give Nickname &amp; Save Pokemon
                    </button>
                  </div>
                </Dialog.Panel>
              ) : (
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Capture Pokemon Failed!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="pb-4 text-sm text-gray-500">
                      Please try again!
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setCaptureStatus(randomizeCaptureStatus());
                      }}
                    >
                      Capture this Pokemon again
                    </button>
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const PokemonDetailPage = () => {
  const pokemonDetail = usePokemon((state: any) => state.pokemonDetail);
  const capturePokemon = usePokemon((state: any) => state.capturePokemon);

  const [isOpen, setIsOpen] = useState(false);
  const [pokemonNickName, setPokemonNickName] = useState('');
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (Object.keys(pokemonDetail).length > 0) setShow(true);
  }, [pokemonDetail]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const randomizeCaptureStatus = () => {
    const random = Math.floor(Math.random() * 2);
    return random === 1 ? 'success' : 'failed';
  };

  return (
    <>
      <div className="mb-4 flex flex-row justify-between bg-slate-800 p-4">
        <h1 className="font-bold text-white">Pokemon Detail</h1>
        <Link href={'/'}>Pokemon List</Link>
      </div>
      <div className="m-auto max-w-[500px] rounded-lg p-4 shadow-lg">
        <div className="flex flex-col items-center justify-center">
          {show && (
            <img
              src={pokemonDetail?.sprites?.front_default}
              alt={pokemonDetail?.name}
              className="h-auto w-[300px]"
            />
          )}
          <div className="w-full">Name: {show && pokemonDetail?.name} </div>
          <div className="w-full">Height: {show && pokemonDetail?.height} </div>
          <div className="w-full">
            Types:{' '}
            {show &&
              pokemonDetail?.types.map(
                (t: { type: { name: string } }, idx: number) =>
                  idx === 0 ? `${t?.type?.name}` : `, ${t?.type?.name}`
              )}{' '}
          </div>
          <div className="mb-4 w-full">
            Moves:{' '}
            {show &&
              pokemonDetail?.moves.map(
                (t: { move: { name: string } }, idx: number) =>
                  idx === 0 ? `${t?.move?.name}` : `, ${t?.move?.name}`
              )}{' '}
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={openModal}
              className="rounded-md  bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              Capture Pokemon
            </button>
          </div>
        </div>
        <CapturePokemonModal
          isOpen={isOpen}
          closeModal={closeModal}
          capturePokemon={capturePokemon}
          pokemonDetail={pokemonDetail}
          pokemonNickName={pokemonNickName}
          randomizeCaptureStatus={randomizeCaptureStatus}
          setPokemonNickName={setPokemonNickName}
        />
      </div>
    </>
  );
};
export default PokemonDetailPage;
