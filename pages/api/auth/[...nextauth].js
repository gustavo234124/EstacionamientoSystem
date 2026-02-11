// SANDBOX VERSION - Using mock data instead of real database
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { mockDB } from '../../../lib/mockData'

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
                    // Buscar usuario en mock data
                    const usuario = await mockDB.usuarios.findByUsername(credentials.username)

                    if (!usuario) {
                        return null
                    }

                    // Verificar contraseña (en demo no está hasheada)
                    if (credentials.password !== usuario.contrasena) {
                        return null
                    }

                    // Retornar usuario autenticado
                    return {
                        id: usuario.id.toString(),
                        name: usuario.nombre_usuario,
                        email: usuario.email
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
    secret: process.env.NEXTAUTH_SECRET || 'demo-secret-for-portfolio-only',
}

export default NextAuth(authOptions)
