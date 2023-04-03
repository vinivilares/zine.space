import Image from "next/image"
import Link from "next/link"

// import ReviewOptions from "components/ReviewOptions"
import ReviewUserInfo from "components/ReviewUserInfo"

import S from "./FeedCard.module.css"

export function FeedCard({
  userImage,
  name,
  movie,
  review,
  reviewId,
  poster,
  rate
}) {
  return (
    <>
      <ReviewUserInfo
        userImage={userImage}
        userName={name}
        movie={movie}
        rate={rate}
      />
      <div className={S.feedCard}>
        <Link href={`${name}/review/${reviewId}`}>
          <div className={S.reviewCard}>
            <p>{review}</p>
            <Image
              src={poster} // TODO - Alterar o link da imagem para vir do banco de dados
              alt="Poster"
              width={100}
              height={148}
            />
          </div>
        </Link>

        {/* <ReviewOptions /> */}
      </div>
    </>
  )
}
