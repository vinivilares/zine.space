import { getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"

import { Navbar } from "components/Navbar"
import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "styles/Review.module.css"

import { getNotifications } from "../../../../lib/notifications"
import { buscarUser, prisma } from "../../../../lib/prisma"

export default function Review({ review, notificationsData, nickname }) {
  return (
    <>
      <Head>
        <title>{`Zine - Review de ${review.review.idUser.nome} sobre ${review.filme.Title}`}</title>
      </Head>
      <Navbar nickname={nickname} notificacoes={notificationsData} />
      <div className={S.container}>
        <div className={S.topo}>
          <ReviewUserInfo
            nome={review.review.idUser.nome}
            nickname={review.review.idUser.nickname}
            userImage={
              review.review.idUser.imagem
                ? review.review.idUser.imagem
                : "/profilepic.png"
            }
            movie={review.filme.Title}
            nota={review.review.nota}
          />
        </div>

        <div className={S.review}>
          <div className={S.movie}>
            <Image
              src={review.filme.Poster}
              alt="Poster"
              width={100}
              height={148}
              priority
            />
            <div>
              <h3>{review.filme.Title}</h3>

              {review.filme.Ratings.map((nota) => (
                <p key={nota.id}>
                  {nota.Source == "Internet Movie Database"
                    ? "IMDB"
                    : nota.Source}
                  : <b>{nota.Value}</b>
                </p>
              ))}
              <p>{review.filme.Genre}</p>
            </div>
          </div>
          <p>{review.review.review}</p>
        </div>
        {nickname && <ReviewOptions />}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { profile, reviewId } = context.query

  const res = await fetch(
    `https://zine-space.vercel.app/api/${profile}/review/${reviewId}`
  )

  const data = await res.json()

  const session = await getSession(context)
  if (session) {
    const user = await buscarUser(session.user.email)
    const notificationsData = await getNotifications(user)

    await prisma.$disconnect()

    return {
      props: { review: data, notificationsData, nickname: user.nickname }
    }
  }

  return {
    props: { review: data }
  }
}
