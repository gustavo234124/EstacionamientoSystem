// pages/estacionamiento.js
import Navmenu from '../components/navmenu.jsx';
import RegisterTable from '../components/registerTable.jsx'

export default function Registros() {
  return (
    <div className="min-h-screen bg-gray-300">
      <Navmenu />

      {/* Contenido con padding izquierdo en PC para que no quede debajo del navbar */}
      <div className="md:ml-64 flex items-center justify-center min-h-screen p-4">
        <RegisterTable />
      </div>
    </div>
  );
}