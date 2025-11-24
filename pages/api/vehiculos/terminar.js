import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, precio } = req.body;

        try {
            const client = await db.connect();
            const result = await client.query(
                'UPDATE registros SET salida = NOW(), precio = $1 WHERE id = $2 RETURNING *',
                [precio, id]
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