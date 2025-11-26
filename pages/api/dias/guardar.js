import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fecha, horaInicio, horaFin, totalRecaudado, vehiculosAtendidos } = req.body;

        try {
            const sql = neon(process.env.POSTGRES_URL);

            const result = await sql`
                INSERT INTO dias_trabajados (fecha, hora_inicio, hora_fin, total_recaudado, vehiculos_atendidos) 
                VALUES (${fecha}, ${horaInicio}, ${horaFin}, ${totalRecaudado}, ${vehiculosAtendidos}) 
                RETURNING *
            `;

            res.status(200).json(result[0]);
        } catch (error) {
            console.error('Error al guardar día:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
