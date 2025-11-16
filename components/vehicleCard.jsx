import React, { useState, useEffect } from 'react';

export default function VehicleCard({ vehiculo, onTerminar }) {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState({ horas: 0, minutos: 0 , segundos: 0 });

  // Calcular tiempo transcurrido
  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      const entrada = new Date(vehiculo.horaEntrada);
      const diferencia = ahora - entrada;
      
      const horas = Math.floor(diferencia / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      setTiempoTranscurrido({ horas, minutos, segundos });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [vehiculo.horaEntrada]);

  // Formatear hora de entrada
  const formatearHora = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  return (
<div className={`bg-gradient-to-br ${vehiculo.color} rounded-2xl p-6 shadow-lg text-white`}>     
   {/* Nombre */}
      <div className="mb-3">
        <p className="text-sm font-semibold opacity-90">Nombre</p>
        <p className="text-xl font-bold">{vehiculo.nombre}</p>
      </div>

      {/* Placas */}
      <div className="mb-3">
        <p className="text-sm font-semibold opacity-90">Placas</p>
        <p className="text-lg font-bold tracking-wider">{vehiculo.placas}</p>
      </div>

      {/* Hora de entrada */}
      <div className="mb-4">
        <p className="text-sm font-semibold opacity-90">Hora de entrada</p>
        <p className="text-lg font-bold">{formatearHora(vehiculo.horaEntrada)}</p>
      </div>

      {/* Tiempo actual */}
      <div className="mb-4">
        <p className="text-sm font-semibold opacity-90 mb-2">Tiempo actual</p>
        <div className="flex gap-4 justify-center bg-black/20 rounded-lg py-3">
          <div className="text-center">
            <p className="text-xs opacity-80">Horas</p>
            <p className="text-3xl font-bold">{tiempoTranscurrido.horas}</p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-80">Minutos</p>
            <p className="text-3xl font-bold">{tiempoTranscurrido.minutos}</p>
          </div>
           <div className="text-center">
            <p className="text-xs opacity-80">Segundos</p>
            <p className="text-3xl font-bold">{tiempoTranscurrido.segundos}</p>
          </div>
        </div>
      </div>

      {/* Observaciones (si existen) */}
      {vehiculo.observaciones && (
        <div className="mb-4 text-sm bg-black/10 rounded-lg p-2">
          <p className="font-semibold">Obs:</p>
          <p className="opacity-90">{vehiculo.observaciones}</p>
        </div>
      )}

      {/* Botón Terminar */}
      <button
        onClick={() => onTerminar(vehiculo.id)}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
      >
        Terminar
      </button>
    </div>
  );
}