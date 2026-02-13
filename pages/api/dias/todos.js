// SANDBOX VERSION - Using mock data instead of real database
import { mockDB } from '../../../lib/mockData';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Obtener todos los días desde mock data
            const result = await mockDB.dias.getAll();

            // Ordenar por ID ascendente para que aparezcan 1, 2, 3...
            const sorted = result.sort((a, b) => a.id - b.id);

            res.status(200).json(sorted);
        } catch (error) {
            console.error('Error al obtener días:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
