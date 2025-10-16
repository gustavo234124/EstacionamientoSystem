import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Crear tabla de usuarios (para login)
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre_usuario VARCHAR(100) UNIQUE NOT NULL,
        contrasena VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Crear tabla de registros del estacionamiento
    await sql`
      CREATE TABLE IF NOT EXISTS registros (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        placas VARCHAR(20) NOT NULL,
        entrada TIMESTAMP NOT NULL DEFAULT NOW(),
        salida TIMESTAMP,
        precio DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    res.status(200).json({ message: 'Tablas creadas exitosamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}