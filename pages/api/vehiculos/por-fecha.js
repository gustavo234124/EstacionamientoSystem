import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { fecha } = req.query;

        if (!fecha) {
            return res.status(400).json({ error: 'Fecha es requerida' });
        }

        try {
            const sql = neon(process.env.POSTGRES_URL);

            // Obtener vehículos de la fecha específica que ya fueron terminados
            const result = await sql`
                SELECT 
                    id,
                    nombre,
                    placas,
                    observaciones,
                    entrada,
                    salida,
                    precio as costo
                FROM registros 
                WHERE DATE(salida) = ${fecha}
                AND salida IS NOT NULL
                ORDER BY salida ASC
            `;

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener vehículos por fecha:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
