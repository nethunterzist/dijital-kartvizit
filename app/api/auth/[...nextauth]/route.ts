import NextAuth from "next-auth";

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from '@/app/lib/db';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Database'den kullanıcıyı bul
          const user = await prisma.admins.findFirst({
            where: { username: credentials.username }
          });

          if (!user) {
            // SECURITY: No username logging to prevent enumeration
            return null;
          }

          // Şifre karşılaştır
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          if (passwordMatch) {
            return {
              id: user.id.toString(),
              name: user.username,
              email: null,
            };
          }

          return null;
        } catch (error) {
          // SECURITY: Only log error in production-safe way
          console.error('Authentication error:', error instanceof Error ? error.message : 'Unknown error');
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  // Serverless environment configuration
  debug: process.env.NODE_ENV === 'development'
});

export { handler as GET, handler as POST };
