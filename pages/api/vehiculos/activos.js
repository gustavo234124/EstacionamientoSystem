// SANDBOX VERSION - Using mock data instead of real database
import { mockDB } from '../../../lib/mockData';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Usar mock data en lugar de base de datos real
            const result = await mockDB.registros.getActivos();

            res.status(200).json(result);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}