import React, { useState, useEffect } from 'react';
import AddOperation from './addOperation.jsx';
import EndDay from './endDay.jsx';
import CountPrice from './countPrice.jsx';

export default function StartDay({ agregarVehiculo }) {
  // Iniciar siempre en false para evitar hydration error
  const [diaIniciado, setDiaIniciado] = useState(false);
  const [modalEndDay, setModalEndDay] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cargar desde localStorage DESPUÉS de montar el componente
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('diaIniciado');
    if (saved === 'true') {
      setDiaIniciado(true);
    }
  }, []);

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('diaIniciado', diaIniciado);
    }
  }, [diaIniciado, mounted]);

  const handleConfirmarTerminar = () => {
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

          <CountPrice />

        </div>
      )}


      <EndDay
        isOpen={modalEndDay}
        onClose={() => setModalEndDay(false)}
        onConfirm={handleConfirmarTerminar}
        totalRecaudado={0}
        vehiculosAtendidos={0}
      />
    </>
  );
}