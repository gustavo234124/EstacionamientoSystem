import { useState } from 'react';
import Navmenu from '../components/navmenu.jsx';
import StartDay from '../components/startDay.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import TerminarVehiculo from '../components/endDay.jsx'; // ← Nuevo componente

export default function Estacionamiento() {
  const [vehiculos, setVehiculos] = useState([]);
  const [modalTerminar, setModalTerminar] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  const colores = [
    'from-orange-400 to-orange-600',
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-red-400 to-red-600',
    'from-pink-400 to-pink-600',
    'from-yellow-400 to-yellow-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600',
  ];

  const agregarVehiculo = (nuevoVehiculo) => {
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    const vehiculo = {
      id: Date.now(),
      ...nuevoVehiculo,
      horaEntrada: new Date().toISOString(),
      color: colorAleatorio,
    };
    setVehiculos([...vehiculos, vehiculo]);
  };

  // Abrir modal para terminar
  const abrirModalTerminar = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setModalTerminar(true);
  };

  // Confirmar terminación
  const confirmarTerminar = (precio) => {
    // Aquí guardarías en BD el registro completo con precio
    console.log('Terminando vehículo:', vehiculoSeleccionado, 'Precio:', precio);
    
    // Eliminar del tablero
    setVehiculos(vehiculos.filter(v => v.id !== vehiculoSeleccionado.id));
    
    // Cerrar modal
    setModalTerminar(false);
    setVehiculoSeleccionado(null);
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Navmenu />
      
      <div className="md:ml-64 p-4 pt-24">
        <StartDay agregarVehiculo={agregarVehiculo} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-20">
          {vehiculos.map(vehiculo => (
            <VehicleCard 
              key={vehiculo.id} 
              vehiculo={vehiculo}
              onTerminar={abrirModalTerminar}  // ← Abre modal
            />
          ))}
        </div>

        {vehiculos.length === 0 && (
          <div className="text-center text-gray-600 mt-20">
            <p className="text-2xl font-bold mb-2">No hay vehículos registrados</p>
          </div>
        )}
      </div>

      {/* Modal para terminar vehículo */}
      <TerminarVehiculo
        isOpen={modalTerminar}
        vehiculo={vehiculoSeleccionado}
        onClose={() => setModalTerminar(false)}
        onConfirm={confirmarTerminar}
      />
    </div>
  );
}