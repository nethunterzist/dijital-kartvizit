import NextAuth from "next-auth";

// API route - dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from '@/app/lib/db';
import fs from 'fs';

// Debug logging function
function debugLog(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  // Console log
  console.log(message);

  // File log
  try {
    fs.appendFileSync('/tmp/auth-debug.log', logMessage);
  } catch (e) {
    // Ignore file write errors
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        debugLog('[AUTH] ========== LOGIN ATTEMPT STARTED ==========');
        debugLog(`[AUTH] Username provided: ${!!credentials?.username}`);
        debugLog(`[AUTH] Password provided: ${!!credentials?.password}`);

        if (!credentials?.username || !credentials?.password) {
          debugLog('[AUTH] FAILED: Missing credentials');
          return null;
        }

        try {
          debugLog(`[AUTH] Searching for user: ${credentials.username}`);

          // Database'den kullanıcıyı bul
          const user = await prisma.admins.findFirst({
            where: { username: credentials.username }
          });

          if (!user) {
            debugLog('[AUTH] FAILED: User not found');
            return null;
          }

          debugLog('[AUTH] User found, checking password');
          debugLog(`[AUTH] Stored hash: ${user.password}`);
          debugLog(`[AUTH] Input password: ${credentials.password}`);

          // Şifre karşılaştır
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          debugLog(`[AUTH] Password match result: ${passwordMatch}`);

          if (passwordMatch) {
            debugLog('[AUTH] SUCCESS: Login successful');
            return {
              id: user.id.toString(),
              name: user.username,
              email: null,
            };
          }

          debugLog('[AUTH] FAILED: Password mismatch');
          return null;
        } catch (error) {
          debugLog(`[AUTH] ERROR: ${error}`);
          debugLog(`[AUTH] Error stack: ${error instanceof Error ? error.stack : 'No stack'}`);
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
  // Enable debug mode in production too
  debug: true
});

export { handler as GET, handler as POST };
