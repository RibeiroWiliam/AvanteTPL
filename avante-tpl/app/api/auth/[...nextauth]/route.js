import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Nome", type: "text"},
        password: { label: "Senha", type: "password"}
      },
      async authorize(credentials) {
        if(!credentials.name || credentials.password ){
          return null
        }
        const publisher = prisma.publisher.findUnique({
          where: credentials.name
        })

        if(!publisher){
          return null
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, publisher.password)

        if(!passwordsMatch){
          return null
        }

        return publisher
      }     
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }