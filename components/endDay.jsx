import React from 'react';

export default function EndDay({ isOpen, onClose, onConfirm, totalRecaudado, vehiculosAtendidos }) {
  
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-cyan-50 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Terminar el día?</h2>
          <p className="text-gray-600">Se guardará el resumen del día</p>
        </div>

        {/* Resumen del día */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total recaudado:</span>
            <span className="text-xl font-bold text-green-600">${totalRecaudado}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Vehículos atendidos:</span>
            <span>{vehiculosAtendidos}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}