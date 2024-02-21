import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const user = await prisma.users.findUnique({
    where: { email: req.body.email },
    select: { seguindo: { select: { id: true } } }
  })

  const followingIds = user.seguindo.map((u) => u.id)

  const reviews = await prisma.reviews.findMany({
    orderBy: { data: "desc" },
    where: {
      idUser: {
        seguidores: {
          some: { email: req.body.email }
        }
      }
    },
    include: {
      idUser: {
        select: {
          nickname: true,
          nome: true,
          imagem: true
        }
      },
      idFilme: {
        select: { idFilme: true }
      }
    }
  })

  await Promise.all(
    reviews.map(async (filme) => {
      const res = await fetch(
        // eslint-disable-next-line no-undef
        `http://www.omdbapi.com/?i=${filme.idFilme.idFilme}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}`
      )
      const data = await res.json()
      filme.idFilme.Poster = data.Poster
      filme.idFilme.Title = data.Title

      filme.idFilme.assistiram = await prisma.assistidos.count({
        where: {
          idFilme: filme.idFilme.idFilme,
          idUser: {
            some: { id: { in: followingIds } }
          }
        }
      })

      filme.idFilme.querVer = await prisma.querVer.count({
        where: {
          idFilme: filme.idFilme.idFilme,
          idUser: {
            some: { id: { in: followingIds } }
          }
        }
      })

      filme.idFilme.recomendam = await prisma.recomendados.count({
        where: {
          idFilme: filme.idFilme.idFilme,
          idUser: {
            some: { id: { in: followingIds } }
          }
        }
      })

      filme.idFilme.naoRecomendam = await prisma.naoRecomendados.count({
        where: {
          idFilme: filme.idFilme.idFilme,
          idUser: {
            some: { id: { in: followingIds } }
          }
        }
      })
    })
  )

  await prisma.$disconnect()

  return res.status(200).json(reviews)
}
