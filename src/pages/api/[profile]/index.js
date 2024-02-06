/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const { profile } = req.query

  if (req.method === "GET") {
    const user = await prisma.users.findUnique({
      where: {
        nickname: profile
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        nome: true,
        dt_nascimento: true,
        biografia: true,
        imagem: true,
        tiktok: true,
        instagram: true,
        twitter: true,
        Assistidos: true,
        Recomendados: true,
        QuerVer: true,
        Notificacoes: true,
        Reviews: true,
        _count: true
        //seguidores: true
        //seguindo: true
      }
    })

    await Promise.all(
      user.Assistidos.slice(0, 15).map(async (filme) => {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${filme.idFilme}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}`
        )
        const data = await res.json()
        filme.Poster = data.Poster
      })
    )
    await Promise.all(
      user.Recomendados.slice(0, 15).map(async (filme) => {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${filme.idFilme}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}`
        )
        const data = await res.json()
        filme.Poster = data.Poster
      })
    )
    await Promise.all(
      user.QuerVer.map(async (filme) => {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${filme.idFilme}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}`
        )
        const data = await res.json()
        filme.Poster = data.Poster
      })
    )
    res.status(200).json(user)
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
}
