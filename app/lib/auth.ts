import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from './db';
import { logger } from './logger';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Kullanıcı Adı / Şifre',
      credentials: {
        username: { label: 'Kullanıcı Adı', type: 'text', placeholder: 'admin' },
        password: { label: 'Şifre', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        
        try {
          // Kullanıcı adına göre admin bilgisini çek
          const user = await prisma.admins.findFirst({
            where: { username: credentials.username }
          });
          
          // Kullanıcı bulunmazsa null döndür
          if (!user) {
            logger.info('Kullanıcı bulunamadı:', credentials.username);
            return null;
          }
          
          logger.info('Kullanıcı bulundu:', { username: user.username, hashedPassword: user.password });
          
          // Şifre karşılaştırması yap
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          
          logger.info('Şifre karşılaştırması:', { 
            inputPassword: credentials.password, 
            hashedPassword: user.password, 
            match: passwordMatch 
          });
          
          if (passwordMatch) {
            // Eşleşirse kimlik bilgilerini döndür
            return {
              id: user.id.toString(),
              name: user.username,
              email: null
            };
          } else {
            // Eşleşmezse null döndür
            return null;
          }
        } catch (error) {
          logger.error('Kimlik doğrulama hatası', { error, username: credentials.username });
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 saat (güvenlik için kısaltıldı)
    updateAge: 60 * 60 * 2, // Session her 2 saatte bir yenile
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Admin erişimi koruma fonksiyonu (middleware olarak kullanılabilir)
export async function isAdmin(req: any, res: any) {
  const session = req.session;
  if (!session || !session.user) {
    return false;
  }
  return true;
}
