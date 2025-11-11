import React, { useState } from 'react';

export default function Navmenu() {
  const [isOpen, setIsOpen] = useState(false);

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
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out z-40 
        md:w-64 
        ${isOpen ? 'w-64' : 'w-0'} 
        overflow-hidden`}
      >
        <div className="p-6 mt-4 md:mt-6">
          <h2 className="text-2xl font-bold mb-6">Menú</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Registros
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Reportes
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">
                  Configuración
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay solo en móviles cuando está abierto */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
}