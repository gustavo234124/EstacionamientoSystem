import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Usuario", type: "text" },
                password: { label: "Contraseña", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const sql = neon(process.env.POSTGRES_URL)

                    // Buscar usuario
                    const usuarios = await sql`
            SELECT * FROM usuarios 
            WHERE nombre_usuario = ${credentials.username}
          `

                    if (usuarios.length === 0) {
                        return null
                    }

                    const usuario = usuarios[0]

                    // Verificar contraseña
                    const passwordMatch = await bcrypt.compare(credentials.password, usuario.contrasena)

                    if (!passwordMatch) {
                        return null
                    }

                    // Retornar usuario autenticado
                    return {
                        id: usuario.id.toString(),
                        name: usuario.nombre_usuario,
                        email: usuario.nombre_usuario // NextAuth requiere email, usamos username
                    }
                } catch (error) {
                    console.error('Error en authorize:', error)
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 horas
    },
    pages: {
        signIn: '/', // Página de login
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
