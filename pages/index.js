import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso - redirigir
        router.push('/estacionamiento');
      } else {
        // Mostrar error
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-contain bg-center" style={{ backgroundImage: "url('/images/backgrounestacionamiento.png')", backgroundSize: 'cover' }}>
      <div className="text-center bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Estacionamiento</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="rounded px-8 pt-6 pb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="username" 
              name="username" 
              type="text" 
              placeholder="Usuario" 
              value={formData.username} 
              onChange={handleChange} 
              disabled={loading}
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Ingrese su contraseña" 
              value={formData.password} 
              onChange={handleChange}
              disabled={loading}
              required 
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-800" href="#">
              Cambiar Contraseña
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}