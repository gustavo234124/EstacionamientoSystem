import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const sql = neon(process.env.POSTGRES_URL);
            const { horaInicio } = req.query;

            let result;

            if (horaInicio) {
                // USAR TIMESTAMPTZ para comparar peras con peras (fechas con zona horaria)
                // Asumimos que 'salida' está guardada como TIMESTAMP (hora local) y la convertimos a TIMESTAMPTZ
                result = await sql`
                    SELECT 
                        COALESCE(SUM(precio), 0) as total,
                        COUNT(*) as cantidad
                    FROM registros 
                    WHERE salida IS NOT NULL
                    AND (salida::timestamp AT TIME ZONE 'America/Mexico_City') >= ${horaInicio}::timestamptz
                `;
            } else {
                // Fallback: Total del día actual (usando fecha del servidor)
                result = await sql`
                    SELECT COALESCE(SUM(precio), 0) as total
                    FROM registros 
                    WHERE DATE(salida AT TIME ZONE 'America/Mexico_City') = CURRENT_DATE
                    AND salida IS NOT NULL
                `;
            }

            const total = parseFloat(result[0].total);
            res.status(200).json({ total });
        } catch (error) {
            console.error('Error en total-dia:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
