// SANDBOX VERSION - Using mock data instead of real database
import { mockDB } from '../../../lib/mockData';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { horaInicio, horaFin } = req.query;

        if (!horaInicio || !horaFin) {
            return res.status(400).json({ error: 'horaInicio y horaFin son requeridos' });
        }

        try {
            // Obtener registros en el rango de fechas
            const registros = await mockDB.registros.getByDateRange(horaInicio, horaFin);

            console.log('Registros encontrados (brutos):', registros.length);

            // Filtrar solo los que tienen salida y formatear
            const result = registros
                .filter(r => r.salida !== null)
                .filter(r => {
                    const salida = new Date(r.salida);
                    return salida >= new Date(horaInicio) && salida <= new Date(horaFin);
                })
                .map(r => ({
                    id: r.id,
                    nombre: r.nombre,
                    placas: r.placas,
                    observaciones: r.observaciones,
                    entrada: r.entrada,
                    salida: r.salida,
                    costo: r.precio
                }))
                .sort((a, b) => a.id - b.id);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener vehículos por rango:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
