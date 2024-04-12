import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/prismaClient";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Nome", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.name || !credentials.password) {
          throw new Error("Por favor, forneça um nome de usuário e senha.");
        }
        console.log(credentials);
        const publisher = await prisma.publisher.findFirst({
          where: {
            name: credentials.name,
          },
        });

        if (!publisher) {
          throw new Error("Usuário não encontrado.");
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, publisher.password)

        if (!passwordsMatch) {
          throw new Error("Senha incorreta.");
        }

        return publisher;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      if(user){
        return {
          ...token, id: user.id, isAdmin: user.isAdmin
        }
      }
      return token
    },
    async session({session, user, token}){
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isAdmin: token.isAdmin
        }
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
