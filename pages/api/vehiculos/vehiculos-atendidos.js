import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const sql = neon(process.env.POSTGRES_URL);
            const { horaInicio } = req.query;

            let result;

            if (horaInicio) {
                result = await sql`
                    SELECT COUNT(*) as cantidad
                    FROM registros 
                    WHERE salida IS NOT NULL
                    AND (salida::timestamp AT TIME ZONE 'America/Mexico_City') >= ${horaInicio}::timestamptz
                `;
            } else {
                result = await sql`
                    SELECT COUNT(*) as cantidad
                    FROM registros 
                    WHERE DATE(salida AT TIME ZONE 'America/Mexico_City') = CURRENT_DATE
                    AND salida IS NOT NULL
                `;
            }

            const cantidad = parseInt(result[0].cantidad);
            res.status(200).json({ cantidad });
        } catch (error) {
            console.error('Error en vehiculos-atendidos:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
