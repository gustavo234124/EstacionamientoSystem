import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const sql = neon(process.env.POSTGRES_URL);
            const result = await sql`
                SELECT * FROM registros 
                WHERE salida IS NULL 
                ORDER BY entrada DESC
            `;

            res.status(200).json(result);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}