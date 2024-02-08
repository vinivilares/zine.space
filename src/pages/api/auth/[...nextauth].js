import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { verifyPassword } from "../../../../lib/auth"
import { buscarUser } from "../../../../lib/prisma"

export default NextAuth({
  session: {
    jwt: true
  },
  secret: {
    // eslint-disable-next-line no-undef
    jwt: process.env.NEXTAUTH_SECRET
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await buscarUser(credentials.email)

        if (!user) {
          throw new Error("Usuário não encontrado!")
        }

        const isValid = await verifyPassword(credentials.password, user.senha)

        if (!isValid) {
          throw new Error("Não foi possível fazer login!")
        }

        return { email: user.email }
      }
    })
  ]
})
