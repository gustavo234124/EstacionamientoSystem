import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const sql = neon(process.env.POSTGRES_URL);

            const result = await sql`
                SELECT * FROM dias_trabajados 
                ORDER BY fecha DESC, hora_inicio DESC
            `;

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener días:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
