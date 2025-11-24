import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre, placas, observaciones } = req.body;

        try {
            const client = await db.connect();
            const result = await client.query(
                'INSERT INTO registros (nombre, placas, observaciones, entrada) VALUES ($1, $2, $3, NOW()) RETURNING *',
                [nombre, placas, observaciones || null]
            );

            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}