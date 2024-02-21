import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {
  const { review } = req.body

  if (req.method !== "POST") {
    return res.status(401).json({ message: "Unauthorized" })
  }

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
  await prisma.$disconnect()
  return res.status(201).json({ message: "ok" })
}
