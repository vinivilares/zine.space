import Image from "next/image"
import Link from "next/link"

// import { FeedCard } from "components/FeedCard"
import { Navbar } from "components/Navbar"
import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "styles/Feed.module.css"

export default function Feed() {
  // const reviews = [
  //   {
  //     id: 1,
  //     usuario: "Roberta",
  //     filme: "Akira",
  //     review: "Filme legal, assitam",
  //     poster:
  //       "https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg",
  //     userImage: "/profilepic.jpg"
  //   },
  //   {
  //     id: 2,
  //     usuario: "Cleitin",
  //     filme: "A Baleia",
  //     review: "Brendan Fraser brabão",
  //     poster:
  //       "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg",
  //     userImage: "/profilepic.jpg"
  //   }
  // ]

  return (
    <div className={S.container}>
      <Navbar />
      {/* {reviews.map((review) => (
        <>
          <FeedCard
            key={review.id}
            name={review.usuario}
            movie={review.filme}
            review={review.review}
            poster={review.poster}
            userImage={review.userImage}
            reviewId={review.id}
          />
          <ReviewOptions />
        </>
      ))} */}

      <ReviewUserInfo
        userImage={"/profilepic.jpg"}
        userName={"Roberta"}
        movie={"Akira"}
        rate={3}
      />

      <div className={S.feedCard}>
        <Link href={`roberta/review/1`}>
          <div className={S.reviewCard}>
            <p>adada</p>
            <Image
              src="https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg"
              // TODO - Alterar o link da imagem para vir do banco de dados
              alt="Poster"
              width={100}
              height={148}
            />
          </div>
        </Link>

        {/* <ReviewOptions /> */}
      </div>

      <ReviewOptions />
    </div>
  )
}
