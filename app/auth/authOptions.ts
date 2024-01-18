import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "your email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {  label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password ) return null;

        const user = await prisma.user.findUnique({ where: { email: credentials.email }});

        if (!user || !user.hashedPassword) return null;

        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        return passwordsMatch ? user : null;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  }
}

export default authOptions
