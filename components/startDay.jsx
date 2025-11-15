import React, { useState } from 'react';
import AddOperation from './addOperation.jsx';

export default function StartDay({ agregarVehiculo }) {  // ← Recibe la prop
  const [diaIniciado, setDiaIniciado] = useState(false);

  return (
    <>
      {!diaIniciado ? (
        <button 
          onClick={() => setDiaIniciado(true)}
          className="bg-red-700 text-white p-3 rounded-2xl absolute top-3 left-20 md:top-4 md:left-80"
        >
          Comenzar Día
        </button>
      ) : (
        <div className="absolute top-3 left-20 md:top-4 md:left-80 flex gap-4 items-center">
          <button 
            onClick={() => setDiaIniciado(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Terminar Día
          </button>

          <AddOperation agregarVehiculo={agregarVehiculo} />  {/* ← Pasa la prop */}
 
          <span className="text-2xl font-bold text-gray-800">$0</span>
        </div>
      )}
    </>
  );
}