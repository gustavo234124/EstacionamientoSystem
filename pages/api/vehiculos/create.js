import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre, placas, observaciones } = req.body;

        try {
            const result = await sql`
        INSERT INTO registros (nombre, placas, observaciones, entrada)
        VALUES (${nombre}, ${placas}, ${observaciones}, NOW())
        RETURNING *
      `;

            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}