import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = await db.connect();
            const result = await client.query('SELECT * FROM registros WHERE salida IS NULL ORDER BY entrada DESC');

            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}