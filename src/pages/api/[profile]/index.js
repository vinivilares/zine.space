/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const { profile } = req.query
  const { usuarioLogado } = req.body

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
    return res.status(200).json(user)
  }

  if (req.method === "PUT") {
    const idDoUsuario = await prisma.users.findUnique({
      where: { nickname: profile },
      select: { id: true }
    })
    const idDoSeguidor = await prisma.users.findUnique({
      where: { email: usuarioLogado },
      select: { id: true }
    })

    if (idDoUsuario.id === idDoSeguidor.id) {
      return res
        .status(401)
        .json({ message: "Não é possível seguir você mesmo" })
    }
    const estaSeguindo = await prisma.users.findFirst({
      where: {
        id: idDoUsuario.id,
        seguidores: {
          some: { id: idDoSeguidor.id }
        }
      }
    })

    if (estaSeguindo) {
      // eslint-disable-next-line no-unused-vars
      const updateUser = await prisma.users.update({
        where: { email: usuarioLogado },
        data: {
          seguindo: {
            disconnect: { nickname: profile }
          }
        }
      })
    } else {
      // eslint-disable-next-line no-unused-vars
      const updateUser = await prisma.users.update({
        where: { email: usuarioLogado },
        data: {
          seguindo: {
            connect: { nickname: profile }
          }
        }
      })
    }

    return res.status(201).json({ message: "Ok" })
  }

  return res.status(401).json({ message: "Unauthorized" })
}
