import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

export async function buscarUser(email) {
  // const prisma = new PrismaClient()
  const user = await prisma.users.findUnique({
    where: { email: email }
  })

  return user
}
