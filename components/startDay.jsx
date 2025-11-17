import React, { useState } from 'react';
import AddOperation from './addOperation.jsx';
import EndDay from './endDay.jsx';

export default function StartDay({ agregarVehiculo }) {  
  const [diaIniciado, setDiaIniciado] = useState(false);
  const [modalEndDay, setModalEndDay] = useState(false);

  const handleConfirmarTerminar = () => {
    // Aquí puedes agregar lógica para guardar en BD
    setModalEndDay(false);
    setDiaIniciado(false);
  };

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
            onClick={() => setModalEndDay(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Terminar Día
          </button>

          <AddOperation agregarVehiculo={agregarVehiculo} />  
 
          <span className="text-2xl font-bold text-gray-800">$0</span>
        </div>
      )}

      {/* Modal EndDay */}
      <EndDay 
        isOpen={modalEndDay}
        onClose={() => setModalEndDay(false)}
        onConfirm={handleConfirmarTerminar}
        totalRecaudado={0}  // Después lo calculas dinámicamente
        vehiculosAtendidos={0}  // Después lo calculas dinámicamente
      />
    </>
  );
}