import React, { useState, useEffect } from 'react';
import AddOperation from './addOperation.jsx';
import EndDay from './endDay.jsx';
import CountPrice from './countPrice.jsx';
import SearchBar from './searchBar.jsx';

export default function StartDay({ agregarVehiculo, vehiculosActivos, totalRecaudado, vehiculosAtendidos, onSearch }) {
  const [diaIniciado, setDiaIniciado] = useState(false);
  const [modalEndDay, setModalEndDay] = useState(false);
  const [modalAdvertencia, setModalAdvertencia] = useState(false);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('diaIniciado');
    if (saved === 'true') {
      setDiaIniciado(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('diaIniciado', diaIniciado);
    }
  }, [diaIniciado, mounted]);

  const handleComenzarDia = () => {
    const ahora = new Date();
    const offset = -6 * 60;
    const localTime = new Date(ahora.getTime() + offset * 60 * 1000);
    const ahoraLocal = localTime.toISOString().replace('Z', '-06:00');

    localStorage.setItem('horaInicioDia', ahoraLocal);
    setDiaIniciado(true);
    // Forzar recarga de vehículos atendidos para que empiece en 0
    if (window.location.reload) {
      window.location.reload();
    }
  };

  const handleClickTerminarDia = () => {

    if (vehiculosActivos > 0) {
      setModalAdvertencia(true);
    } else {
      setModalEndDay(true);
    }
  };

  const handleConfirmarTerminar = async () => {
    try {
      // Obtener hora de inicio del día desde localStorage
      const horaInicio = localStorage.getItem('horaInicioDia');
      const horaFin = new Date();
      const offset = -6 * 60;
      const localTime = new Date(horaFin.getTime() + offset * 60 * 1000);
      const horaFinLocal = localTime.toISOString().replace('Z', '-06:00');

      // Obtener la fecha (solo la parte de fecha)
      const fecha = horaFinLocal.split('T')[0];

      // Guardar el registro del día
      await fetch('/api/dias/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha,
          horaInicio,
          horaFin: horaFinLocal,
          totalRecaudado,
          vehiculosAtendidos
        })
      });

      // Limpiar localStorage
      localStorage.removeItem('horaInicioDia');
      setModalEndDay(false);
      setDiaIniciado(false);
    } catch (error) {
      console.error('Error al guardar día:', error);
      // Aún así cerrar el día
      localStorage.removeItem('horaInicioDia');
      setModalEndDay(false);
      setDiaIniciado(false);
    }
  };

  return (
    <>
      {!diaIniciado ? (
        <button
          onClick={handleComenzarDia}
          className="bg-red-700 text-white p-3 rounded-2xl absolute top-3 left-20 md:top-4 md:left-80"
        >
          Comenzar Día
        </button>
      ) : (
        <div className="absolute top-3 left-20 md:top-4 md:left-80 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex gap-4 items-center">
            <button
              onClick={handleClickTerminarDia}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Terminar Día
            </button>

            <AddOperation agregarVehiculo={agregarVehiculo} />

            <CountPrice totalRecaudado={totalRecaudado} />
          </div>

          <div className="w-full md:w-auto">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      )}


      {/* Modal de advertencia */}
      {modalAdvertencia && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setModalAdvertencia(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <svg className="mx-auto h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mt-4">¡Atención!</h3>
              <p className="text-gray-600 mt-2">
                Tienes <span className="font-bold text-red-600">{vehiculosActivos}</span> vehículo{vehiculosActivos > 1 ? 's' : ''} pendiente{vehiculosActivos > 1 ? 's' : ''}.
              </p>
              <p className="text-gray-600 mt-1">
                Debes terminar todos los vehículos antes de terminar el día.
              </p>
            </div>
            <button
              onClick={() => setModalAdvertencia(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <EndDay
        isOpen={modalEndDay}
        onClose={() => setModalEndDay(false)}
        onConfirm={handleConfirmarTerminar}
        totalRecaudado={totalRecaudado}
        vehiculosAtendidos={vehiculosAtendidos}
      />
    </>
  );
}