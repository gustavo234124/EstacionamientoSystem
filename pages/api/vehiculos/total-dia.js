// SANDBOX VERSION - Using mock data instead of real database
import { mockDB } from '../../../lib/mockData';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { horaInicio } = req.query;

            let total = 0;

            if (horaInicio) {
                // Calcular total desde hora específica
                total = await mockDB.registros.getTotalSinceTime(horaInicio);
            } else {
                // Calcular total del día actual
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                total = await mockDB.registros.getTotalSinceTime(hoy.toISOString());
            }

            res.status(200).json({ total });
        } catch (error) {
            console.error('Error en total-dia:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
