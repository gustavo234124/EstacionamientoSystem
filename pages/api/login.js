// SANDBOX VERSION - Using mock data instead of real database
import { mockDB } from '../../lib/mockData';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    // Buscar usuario en mock data
    const usuario = await mockDB.usuarios.findByUsername(username);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Verificar contraseña (en demo no está hasheada)
    if (password !== usuario.contrasena) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Login exitoso
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      usuario: usuario.nombre_usuario
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}