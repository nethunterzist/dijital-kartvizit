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
          console.log('[AUTH] Missing credentials');
          return null;
        }

        try {
          // Database'den kullanıcıyı bul
          const user = await prisma.admins.findFirst({
            where: { username: credentials.username }
          });

          if (!user) {
            console.log('[AUTH] User not found');
            return null;
          }

          // Şifre karşılaştır
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          if (passwordMatch) {
            console.log('[AUTH] Login successful');
            return {
              id: user.id.toString(),
              name: user.username,
              email: null,
            };
          }

          console.log('[AUTH] Password mismatch');
          return null;
        } catch (error) {
          console.error('[AUTH] Error:', error);
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
  debug: process.env.NODE_ENV === 'development'
});

export { handler as GET, handler as POST };
