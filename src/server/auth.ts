import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import bcrypt from "bcrypt"

import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      balance: number;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

const AUTH_PAGES = {
  signIn: "/signin.tsx",
  signOut: "/signup.tsx",
  index: "/"
}
export const authOptions: NextAuthOptions = {
  callbacks: {
     session: async ({session, token, user}) => {
      if (session?.user) {
        // Access the user ID from the token (assuming it's stored there)
        session.user.id = token.sub?? ""; // Adjust property name based on your adapter
      }
      return session;
    },
  
    async jwt({ token, user }) {
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: AUTH_PAGES,
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
 
    CredentialsProvider({
      name: "Credentials",
      credentials:{
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"}
      },  
      async authorize(credentials){    
        const user = await db.user.findFirst({
          where: {
            email: credentials?.email
          }
        })
        if(user?.emailVerified === null) throw new Error("Email not verified");

        const isVerified = await bcrypt.compare(credentials?.password ?? "", user?.password ?? "");
        if(isVerified){
          return user;
        }
        throw new Error("Invalid credentials");
      }
    })
    ]
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};