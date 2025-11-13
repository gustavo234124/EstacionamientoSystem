import React, { useState } from 'react';
import AddOperation from '../components/addOperation.jsx';
export default function StartDay() {
  const [diaIniciado, setDiaIniciado] = useState(false);

  return (
    <>
      {!diaIniciado ? (
        // Botón inicial
        <button 
          onClick={() => setDiaIniciado(true)}
          className="bg-red-700 text-white p-3 rounded-2xl absolute top-4 left-80"
        >
          Comenzar Día
        </button>
      ) : (
        // Botones y span cuando el día está iniciado
        <div className="absolute top-4 left-80 flex gap-4 items-center">
          <button 
            onClick={() => setDiaIniciado(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Terminar Día
          </button>

            <AddOperation />

 
          <span className="text-2xl font-bold text-gray-800">$0</span>
        </div>
      )}
    </>
  );
}