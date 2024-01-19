// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const users = await prisma.users.findMany({
    select: { id: true, nome: true, nickname: true, Assistidos: true }
  })

  res.status(200).json(users)

  await prisma.$disconnect()
}
