import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Credenciales iniciales del sistema
    const usuario = 'joseAguirre';
    const contrasenaInicial = 'Estacionamiento2024'; // Contraseña segura inicial
    
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasenaInicial, 10);
    
    // Insertar usuario (solo si no existe)
    const result = await sql`
      INSERT INTO usuarios (nombre_usuario, contrasena)
      VALUES (${usuario}, ${hashedPassword})
      ON CONFLICT (nombre_usuario) DO NOTHING
      RETURNING id
    `;

    if (result.length > 0) {
      res.status(200).json({ 
        message: 'Usuario inicial creado exitosamente',
        credenciales: {
          usuario: usuario,
          contrasena: contrasenaInicial,
          nota: 'Guarda estas credenciales. El usuario podrá cambiar la contraseña después del primer login.'
        }
      });
    } else {
      res.status(200).json({ 
        message: 'El usuario ya existe en el sistema'
      });
    }
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: error.message });
  }
}