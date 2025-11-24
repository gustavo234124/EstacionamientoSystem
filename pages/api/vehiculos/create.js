import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nombre, placas, observaciones } = req.body;

        try {
            const sql = neon(process.env.POSTGRES_URL);
            const result = await sql`
                INSERT INTO registros (nombre, placas, observaciones, entrada) 
                VALUES (${nombre}, ${placas}, ${observaciones || null}, NOW()) 
                RETURNING *
            `;

            res.status(200).json(result[0]);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}