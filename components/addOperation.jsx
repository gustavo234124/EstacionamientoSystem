import React, { useState } from 'react';

export default function AddOperation() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setModalOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Agregar
      </button>

      {/* Modal */}
      {modalOpen && (
        <>
          {/* Overlay con blur */}
          <div 
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Contenido del modal */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Agregar Vehículo</h2>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                 
                </button>
              </div>

              {/* Formulario */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nombre del cliente"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Placas
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="ABC-1234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Observaciones
                  </label>
                 <textarea 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Detalles adicionales"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 bg-red-600 text-white  py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}