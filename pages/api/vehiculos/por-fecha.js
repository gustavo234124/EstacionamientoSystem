import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { horaInicio, horaFin } = req.query;

        if (!horaInicio || !horaFin) {
            return res.status(400).json({ error: 'horaInicio y horaFin son requeridos' });
        }

        try {
            const sql = neon(process.env.POSTGRES_URL);

            // Convertir a objetos Date para asegurar comparación correcta
            const startDate = new Date(horaInicio);
            const endDate = new Date(horaFin);

            // Obtener vehículos dentro del rango de tiempo de la sesión
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
                WHERE salida IS NOT NULL
                AND salida >= ${startDate}
                AND salida <= ${endDate}
                ORDER BY salida ASC
            `;

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener vehículos por rango:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
