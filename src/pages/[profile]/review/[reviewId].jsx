import Image from "next/image"
// import Link from "next/link"

// import { FeedCard } from "components/FeedCard"
import { Navbar } from "components/Navbar"
import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "styles/Review.module.css"

export default function Review({ dadosReview }) {
  return (
    <>
      <Navbar />
      <div className={S.container}>
        <div className={S.topo}>
          <ReviewUserInfo
            nome={dadosReview.user.nome}
            nickname={dadosReview.user.nickname}
            userImage={dadosReview.user.imagem}
            movie={dadosReview.filmeReview.data.Title}
            nota={dadosReview.review.nota}
          />
        </div>
        <div className={S.review}>
          <div className={S.movie}>
            <Image
              src={dadosReview.filmeReview.data.Poster}
              alt="Poster"
              width={100}
              height={148}
              priority
            />
            <div>
              <h3>{dadosReview.filmeReview.data.Title}</h3>

              {dadosReview.filmeReview.data.Ratings.map((nota) => (
                <p key={nota.id}>
                  {nota.Source == "Internet Movie Database"
                    ? "IMDB"
                    : nota.Source}
                  : <b>{nota.Value}</b>
                </p>
              ))}
              <p>{dadosReview.filmeReview.data.Genre}</p>
            </div>
          </div>
          <p>{dadosReview.review.review}</p>
        </div>

        <ReviewOptions />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { profile, reviewId } = context.query
  const res = await fetch(
    `http://localhost:3000/api/${profile}/review/${reviewId}`
  )
  const dadosReview = await res.json()

  return {
    props: { dadosReview }
  }
}
