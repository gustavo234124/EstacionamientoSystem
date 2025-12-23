import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export default function Navmenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { isInstallable, install } = usePWAInstall();

  return (
    <>
      {/* Botón solo visible en móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 md:hidden"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Sidebar - Siempre abierto en PC, contraíble en móvil */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 rounded-tr-4xl rounded-br-4xl text-white transition-all duration-300 ease-in-out z-40 
        md:w-64 
        ${isOpen ? 'w-64' : 'w-0'} 
        overflow-hidden flex flex-col`}

      >
        {/* Usuario - Fijo arriba */}
        {session && (
          <div className="p-6 pb-4 border-b border-gray-600 text-center">
            <p className="text-sm text-gray-400">Usuario</p>
            <p className="text-lg font-semibold">{session.user.name}</p>
          </div>
        )}

        {/* Navegación - Centrada verticalmente */}
        <div className="flex-1 flex items-center justify-center text-center">
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="/estacionamiento" className="block py-2 px-4 text-3xl hover:bg-gray-700 rounded">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/registros" className="block py-2 px-4 text-2xl hover:bg-gray-700 rounded">
                  Registros
                </a>
              </li>
              {isInstallable && (
                <li>
                  <button
                    onClick={install}
                    className="w-full text-left block py-2 px-4 text-2xl hover:bg-gray-700 rounded text-blue-400 font-bold"
                  >
                    Descargar App
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay solo en móviles cuando está abierto */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-white/10 z-30 md:hidden"
        />
      )}
    </>
  );
}