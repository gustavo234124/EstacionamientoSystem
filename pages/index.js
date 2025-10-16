export default function Home() {
  return (
   <div
  className="flex items-center justify-center min-h-screen bg-no-repeat bg-contain bg-center"
  style={{ backgroundImage: "url('/images/backgrounestacionamiento.png')",backgroundSize: 'cover' }}
>


  <div className="text-center bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-lg shadow-md">
    <h1 className="text-3xl font-bold text-gray-800">Estacionamiento</h1>
   
   <form className="rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="username"
    >
      Usuario
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="username"
      type="text"
      placeholder="Username"
    />
  </div>

  <div className="mb-6">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="password"
    >
      Contraseña
    </label>
    <input
      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="password"
      type="password"
      placeholder="Ingrese su contraseña"
    />
    <p className="text-red-500 text-xs italic">Por favor ingrese su contraseña.</p>
  </div>

  <div className="flex items-center justify-between">
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
      Ingresar
    </button>
    <a
      className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-800"
      href="#"
    >
      Cambiar Contraseña
    </a>
  </div>
</form>

   
  </div>


</div>  

  );
}
