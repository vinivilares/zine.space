import Image from "next/image"
// import Link from "next/link"

// import { FeedCard } from "components/FeedCard"
import { Navbar } from "components/Navbar"
import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "styles/Review.module.css"

export default function Review({ review }) {
  console.log(review)
  return (
    <>
      <Navbar />
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

        <ReviewOptions />
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

  return {
    props: { review: data }
  }
}
