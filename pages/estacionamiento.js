// pages/estacionamiento.js
import Navmenu from '../components/navmenu.jsx';
import StartDay from '../components/startDay.jsx';

export default function Estacionamiento() { 
  return (
    <div className="min-h-screen bg-gray-300">
      <Navmenu />
      
      {/* Contenido con padding izquierdo en PC para que no quede debajo del navbar */}
      <div className="md:ml-64 flex items-center justify-center min-h-screen p-4">
        
        <StartDay />


      </div>
    </div>
  );
}