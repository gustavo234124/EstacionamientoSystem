import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, precio } = req.body;

        try {
            const sql = neon(process.env.POSTGRES_URL);

            // Crear fecha en zona horaria local (México UTC-6)
            const ahora = new Date();
            const offset = -6 * 60; // UTC-6 en minutos
            const localTime = new Date(ahora.getTime() + offset * 60 * 1000);
            const ahoraLocal = localTime.toISOString().replace('Z', '-06:00');

            const result = await sql`
                UPDATE registros 
                SET salida = ${ahoraLocal}, precio = ${precio} 
                WHERE id = ${id} 
                RETURNING *
            `;

            res.status(200).json(result[0]);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}