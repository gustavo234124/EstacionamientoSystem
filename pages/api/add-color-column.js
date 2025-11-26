import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const sql = neon(process.env.POSTGRES_URL);

            // Agregar columna color a la tabla registros
            await sql`
                ALTER TABLE registros 
                ADD COLUMN IF NOT EXISTS color VARCHAR(100) DEFAULT 'from-blue-400 to-blue-600'
            `;

            res.status(200).json({
                message: 'Columna color agregada exitosamente',
                success: true
            });
        } catch (error) {
            console.error('Error al agregar columna:', error);
            res.status(500).json({
                error: error.message,
                success: false
            });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
