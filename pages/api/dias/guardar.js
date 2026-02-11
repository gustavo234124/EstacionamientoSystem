// SANDBOX VERSION - Using mock data instead of real database
import { mockDB } from '../../../lib/mockData';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fecha, horaInicio, horaFin, totalRecaudado, vehiculosAtendidos } = req.body;

        try {
            // Guardar día en mock data
            const result = await mockDB.dias.create({
                fecha,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                total: totalRecaudado,
                vehiculos_atendidos: vehiculosAtendidos
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al guardar día:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
