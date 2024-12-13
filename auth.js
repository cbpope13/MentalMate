import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from '@/lib/client.js';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    }
  }
});
