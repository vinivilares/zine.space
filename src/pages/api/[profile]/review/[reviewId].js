/* eslint-disable no-undef */
import { prisma } from "../../../../../lib/prisma"

// import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  // const prisma = new PrismaClient()
  const { reviewId } = req.query

  if (req.method !== "GET") {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const review = await prisma.reviews.findUnique({
    where: { id: Number(reviewId) }
  })

  const user = await prisma.users.findUnique({
    where: { id: Number(review.usersId) },
    select: { nome: true, imagem: true, nickname: true }
  })

  let filmeReview = await prisma.assistidos.findUnique({
    where: { id: Number(reviewId) }
  })

  const movie = await fetch(
    `http://www.omdbapi.com/?i=${filmeReview.idFilme}&apikey=${process.env.NEXT_PUBLIC_OMDBAPIKEY}`
  )

  const data = await movie.json()

  filmeReview = { ...filmeReview, data }

  return res.status(200).json({ review, filmeReview, user })
}
