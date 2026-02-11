// SANDBOX VERSION - Using mock data instead of real database
import { mockDB } from '../../../lib/mockData';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, precio } = req.body;

        try {
            // Crear fecha en zona horaria local (México UTC-6)
            const ahora = new Date();
            const offset = -6 * 60; // UTC-6 en minutos
            const localTime = new Date(ahora.getTime() + offset * 60 * 1000);
            const ahoraLocal = localTime.toISOString().replace('Z', '-06:00');

            // Actualizar registro en mock data
            const result = await mockDB.registros.update(id, {
                salida: ahoraLocal,
                precio: parseFloat(precio)
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}