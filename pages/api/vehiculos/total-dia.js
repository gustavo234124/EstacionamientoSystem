import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const sql = neon(process.env.POSTGRES_URL);
            const { horaInicio } = req.query;

            let result;

            if (horaInicio) {
                // Obtener el total desde la hora de inicio del día
                result = await sql`
                    SELECT COALESCE(SUM(precio), 0) as total
                    FROM registros 
                    WHERE salida >= ${horaInicio}
                    AND salida IS NOT NULL
                `;
            } else {
                // Obtener el total del día actual (fallback)
                result = await sql`
                    SELECT COALESCE(SUM(precio), 0) as total
                    FROM registros 
                    WHERE DATE(salida) = CURRENT_DATE
                    AND salida IS NOT NULL
                `;
            }

            res.status(200).json({ total: parseFloat(result[0].total) });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
