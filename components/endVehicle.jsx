import React, { useState, useEffect } from 'react';

export default function EndVehicle({ isOpen, vehiculo, onClose, onConfirm }) {
  const [tiempoTotal, setTiempoTotal] = useState({ horas: 0, minutos: 0 });
  const [precio, setPrecio] = useState(0);
  const TARIFA_POR_HORA = 15; // Puedes ajustar esto o recibirlo como prop

  useEffect(() => {
    if (vehiculo && isOpen) {
      const entrada = new Date(vehiculo.horaEntrada);
      const salida = new Date();
      const diferencia = salida - entrada;

      const horas = Math.floor(diferencia / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

      setTiempoTotal({ horas, minutos });


      const horasACobrar = minutos > 0 ? horas + 1 : horas;
      const totalACobrar = Math.max(1, horasACobrar) * TARIFA_POR_HORA;

      setPrecio(totalACobrar);
    }
  }, [vehiculo, isOpen]);

  if (!isOpen || !vehiculo) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cobrar Vehículo</h2>
          <p className="text-gray-500">{vehiculo.nombre}</p>
        </div>

        {/* Detalles del cobro */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Placas</span>
            <span className="font-bold text-lg">{vehiculo.placas}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Tiempo Total</span>
            <span className="font-bold">
              {tiempoTotal.horas}h {tiempoTotal.minutos}m
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-semibold text-gray-800">Total a Pagar</span>
            <span className="text-3xl font-bold text-green-600">${precio}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(precio)}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors shadow-lg shadow-green-200"
          >
            Cobrar y Salir
          </button>
        </div>
      </div>
    </div>
  );
}