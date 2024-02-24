import { getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { Navbar } from "components/Navbar"
import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "styles/Feed.module.css"

import { getNotifications } from "../../../lib/notifications"
import { prisma } from "../../../lib/prisma"

export default function Feed({ user, reviews, notificacoes }) {
  return (
    <>
      <Head>
        <title>Zine - Feed</title>
      </Head>

      <Navbar nickname={user.nickname} notificacoes={notificacoes} />

      {reviews.length ? (
        <div className={S.container}>
          {reviews.map((review) => (
            <div className={S.feedItem} key={review.id}>
              <ReviewUserInfo
                userImage={"/profilepic.png"}
                movie={review.idFilme.Title}
                nome={review.idUser.nome}
                nickname={review.idUser.nickname}
                nota={review.nota}
              />
              <div className={S.feedCard}>
                <Link href={`/${review.idUser.nickname}/review/${review.id}`}>
                  <div className={S.reviewCard}>
                    <p>{review.review}</p>
                    <Image
                      src={review.idFilme.Poster}
                      alt="Poster"
                      width={100}
                      height={148}
                      priority
                    />
                  </div>
                </Link>
              </div>
              <ReviewOptions
                querVer={review.idFilme.querVer}
                assistiram={review.idFilme.assistiram}
                recomendam={review.idFilme.recomendam}
                naoRecomendam={review.idFilme.naoRecomendam}
                title={review.idFilme.Title}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={S.container}>
          <h2>Siga seus amigos e veja suas publicações</h2>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context)

  if (!userSession) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  const res = await fetch("https://zine-space.vercel.app/api/feed", {
    method: "POST",
    body: JSON.stringify({
      email: userSession.user.email
    }),
    headers: { "Content-Type": "application/json" }
  })

  const reviews = await res.json()

  const user = await prisma.users.findFirst({
    where: { email: userSession.user.email },
    select: { nickname: true, id: true }
  })

  const notificationsData = await getNotifications(user)

  await prisma.$disconnect()

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      reviews: JSON.parse(JSON.stringify(reviews)),
      notificacoes: JSON.parse(JSON.stringify(notificationsData))
    }
  }
}
