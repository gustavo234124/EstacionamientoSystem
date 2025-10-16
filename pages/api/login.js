import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    const sql = neon(process.env.DATABASE_URL);

    // Buscar usuario
    const usuarios = await sql`
      SELECT * FROM usuarios 
      WHERE nombre_usuario = ${username}
    `;

    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const usuario = usuarios[0];

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.contrasena);

    if (!passwordMatch) {
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