// SANDBOX VERSION - Using mock data instead of real database
import { mockDB } from '../../../lib/mockData';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { horaInicio } = req.query;

            let cantidad = 0;

            if (horaInicio) {
                // Contar desde hora específica
                cantidad = await mockDB.registros.getCountSinceTime(horaInicio);
            } else {
                // Contar del día actual
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                cantidad = await mockDB.registros.getCountSinceTime(hoy.toISOString());
            }

            res.status(200).json({ cantidad });
        } catch (error) {
            console.error('Error en vehiculos-atendidos:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
