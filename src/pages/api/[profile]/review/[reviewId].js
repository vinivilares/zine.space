import { prisma } from "../../../../../lib/prisma"

export default async function handler(req, res) {
  const { reviewId } = req.query

  if (req.method === "GET") {
    const review = await prisma.reviews.findFirst({
      where: { id: Number(reviewId) },
      include: {
        idUser: {
          select: {
            nickname: true,
            nome: true,
            imagem: true
          }
        },
        idFilme: { select: { idFilme: true } }
      }
    })

    const filme = await fetch(
      `http://www.omdbapi.com/?i=${review.idFilme.idFilme}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}`
    )

    const poster = await filme.json()

    return res.status(200).json({ review, filme: poster })
  }
}
