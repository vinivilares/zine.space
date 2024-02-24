import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {
  const { userId, idDoUsuario, idDoSeguidor } = req.body

  if (req.method === "POST") {
    const notifications = await prisma.notificacoes.findMany({
      include: {
        idUser: {
          select: {
            nome: true,
            nickname: true,
            imagem: true
          }
        }
      },
      where: { idSeguidor: userId },
      orderBy: { createdAt: "desc" }
    })

    await prisma.$disconnect()

    return res.status(200).json(notifications)
  }

  if (req.method === "PUT") {
    // eslint-disable-next-line no-unused-vars
    const notificacoes = await prisma.notificacoes.create({
      data: {
        idSeguidor: idDoUsuario,
        idUser: { connect: { id: idDoSeguidor } }
      }
    })
  }

  return res.status(401).json({ message: "Unauthorized" })
}
