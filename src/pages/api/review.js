import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {
  const { review, reviewID } = req.body

  if (req.method === "POST") {
    // eslint-disable-next-line no-unused-vars
    const saveReview = await prisma.reviews.create({
      data: {
        idUser: { connect: { id: review.userId } },
        review: review.review,
        nota: Number(review.nota),
        spoiler: review.spoiler,
        idFilme: { connect: { id: review.assistidosId } }
      }
    })

    return res.status(201).json({ message: "OK" })
  }

  if (req.method === "PUT") {
    // eslint-disable-next-line no-unused-vars
    const updateReview = await prisma.reviews.update({
      data: {
        idUser: { connect: { id: review.userId } },
        review: review.review,
        nota: Number(review.nota),
        spoiler: review.spoiler,
        idFilme: { connect: { id: review.assistidosId } }
      },
      where: { id: reviewID }
    })
    return res.status(201).json({ message: "OK" })
  }

  if (req.method === "DELETE") {
    // eslint-disable-next-line no-unused-vars
    const deleteReview = await prisma.reviews.delete({
      where: { id: reviewID }
    })

    return res.status(201).json({ message: "OK" })
  }

  await prisma.$disconnect()

  return res.status(401).json({ message: "Unauthorized" })
}
