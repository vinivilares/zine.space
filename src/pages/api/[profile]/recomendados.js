/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const { profile } = req.query

  if (req.method !== "GET") {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const user = await prisma.users.findUnique({
    where: { nickname: profile },
    select: { Recomendados: true, imagem: true, nome: true }
  })

  await Promise.all(
    user.Recomendados.map(async (filme) => {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${filme.idFilme}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}`
      )
      const data = await res.json()
      filme.Poster = data.Poster
    })
  )

  return res.status(200).json(user)
}
