import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const sql = neon(process.env.POSTGRES_URL);

            // Obtener el total recaudado del día actual
            const result = await sql`
                SELECT COALESCE(SUM(precio), 0) as total
                FROM registros 
                WHERE DATE(salida) = CURRENT_DATE
                AND salida IS NOT NULL
            `;

            res.status(200).json({ total: parseFloat(result[0].total) });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
