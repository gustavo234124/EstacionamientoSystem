// pages/estacionamiento.js
import Navmenu from '../components/navmenu.jsx';
import StartDay from '../components/startDay.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { useState } from 'react';

export default function Estacionamiento() {
  const [vehiculos, setVehiculos] = useState([]);


    const colores = [
    'from-orange-400 to-orange-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-red-400 to-red-600',
    'from-yellow-400 to-yellow-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600',
  ];
  // ← AQUÍ está la función que faltaba
const agregarVehiculo = (nuevoVehiculo) => {
  const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
  const vehiculo = {
    id: Date.now(),
    ...nuevoVehiculo,
    horaEntrada: new Date().toISOString(),
    color: colorAleatorio, // ← Color aleatorio
  };
  setVehiculos([...vehiculos, vehiculo]);
};

  // Función para terminar/eliminar vehículo
  const terminarVehiculo = (id) => {
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Navmenu />
      
      <div className="md:ml-64 p-4 pt-24">
        <StartDay agregarVehiculo={agregarVehiculo} />

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-20">
          {vehiculos.map(vehiculo => (
            <VehicleCard 
              key={vehiculo.id} 
              vehiculo={vehiculo}
              onTerminar={terminarVehiculo}
            />
          ))}
        </div>

        {vehiculos.length === 0 && (
          <div className="text-center text-gray-600 mt-20">
            <p className="text-2xl font-bold mb-2">No hay vehículos registrados</p>
          </div>
        )}
      </div>
    </div>
  );
}