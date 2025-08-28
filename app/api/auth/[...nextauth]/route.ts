import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
          console.log('❌ Credentials eksik');
          return null;
        }

        try {
          console.log('🔍 Auth deneniyor:', credentials.username);
          
          // Database'den kullanıcıyı bul
          const user = await prisma.admins.findFirst({
            where: { username: credentials.username }
          });
          
          if (!user) {
            console.log('❌ Kullanıcı bulunamadı:', credentials.username);
            return null;
          }
          
          console.log('✅ Kullanıcı bulundu, şifre kontrol ediliyor');
          
          // Şifre karşılaştır
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          
          console.log('🔐 Şifre karşılaştırması:', passwordMatch);
          
          if (passwordMatch) {
            console.log('✅ Login başarılı!');
            return {
              id: user.id.toString(),
              name: user.username,
              email: null,
            };
          }
          
          console.log('❌ Şifre yanlış');
          return null;
        } catch (error) {
          console.error('💥 Auth error:', error);
          return null;
        } finally {
          await prisma.$disconnect();
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
  debug: process.env.NODE_ENV === 'development',
  trustHost: true
});

export { handler as GET, handler as POST };
