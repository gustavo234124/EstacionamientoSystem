import React, { useState } from 'react';

export default function StartDay() {
  const [diaIniciado, setDiaIniciado] = useState(false);

  return (
    <>
      {!diaIniciado ? (
        <button 
          onClick={() => setDiaIniciado(true)}
          className="bg-red-700 text-white p-3 rounded-2xl absolute"
        >
          Comenzar Día
        </button>
      ) : (
        <div className="absolute flex gap-4 items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Terminar Día
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Agregar
          </button>
          <span className="text-2xl font-bold text-gray-800">$0</span>
        </div>
      )}
    </>
  );
}