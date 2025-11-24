import { useState, useEffect } from 'react';
import Navmenu from '../components/navmenu.jsx';
import StartDay from '../components/startDay.jsx';
import VehicleCard from '../components/vehicleCard.jsx';
import EndVehicle from '../components/endVehicle.jsx';

export default function Estacionamiento() {
  const [vehiculos, setVehiculos] = useState([]);
  const [modalTerminar, setModalTerminar] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

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

  // Traer vehículos activos al cargar la página
  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    try {
      const response = await fetch('/api/vehiculos/activos');
      const data = await response.json();

      // Agregar color aleatorio a cada vehículo
      const vehiculosConColor = data.map(v => ({
        ...v,
        horaEntrada: v.entrada, // Mapear 'entrada' de BD a 'horaEntrada' del componente
        color: colores[Math.floor(Math.random() * colores.length)]
      }));

      setVehiculos(vehiculosConColor);
      setCargando(false);
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
      setCargando(false);
    }
  };

  // Agregar vehículo (ya viene de la BD con ID)
  const agregarVehiculo = (nuevoVehiculo) => {
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    const vehiculo = {
      ...nuevoVehiculo,
      horaEntrada: nuevoVehiculo.entrada, // Mapear 'entrada' de BD a 'horaEntrada'
      color: colorAleatorio,
    };
    setVehiculos([...vehiculos, vehiculo]);
  };

  // Abrir modal para terminar
  const abrirModalTerminar = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setModalTerminar(true);
  };

  // Confirmar terminación y actualizar BD
  const confirmarTerminar = async (precio) => {
    try {
      const response = await fetch('/api/vehiculos/terminar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: vehiculoSeleccionado.id,
          precio: precio
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Vehículo terminado:', data);

        // Eliminar del tablero
        setVehiculos(vehiculos.filter(v => v.id !== vehiculoSeleccionado.id));

        // Cerrar modal
        setModalTerminar(false);
        setVehiculoSeleccionado(null);
      } else {
        console.error('Error al terminar:', data.error);
        alert('Error al terminar el vehículo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Navmenu />

      <div className="md:ml-64 p-4 pt-24">
        <StartDay agregarVehiculo={agregarVehiculo} />

        {cargando ? (
          <div className="text-center text-gray-600 mt-20">
            <p className="text-2xl font-bold">Cargando vehículos...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-20">
              {vehiculos.map(vehiculo => (
                <VehicleCard
                  key={vehiculo.id}
                  vehiculo={vehiculo}
                  onTerminar={abrirModalTerminar}
                />
              ))}
            </div>

            {vehiculos.length === 0 && (
              <div className="text-center text-gray-600 mt-20">
                <p className="text-2xl font-bold mb-2">No hay vehículos registrados</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal para terminar vehículo */}
      <EndVehicle
        isOpen={modalTerminar}
        vehiculo={vehiculoSeleccionado}
        onClose={() => setModalTerminar(false)}
        onConfirm={confirmarTerminar}
      />
    </div>
  );
}