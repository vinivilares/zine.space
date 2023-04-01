import { FeedCard } from "components/FeedCard"
import { Navbar } from "components/Navbar"

export default function Feed() {
  const reviews = [
    {
      id: 1,
      usuario: "Roberta",
      filme: "Akira",
      review: "Filme legal, assitam",
      poster:
        "https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg",
      userImage: "/profilepic.jpg"
    },
    {
      id: 2,
      usuario: "Cleitin",
      filme: "A Baleia",
      review: "Brendan Fraser brabão",
      poster:
        "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_SX300.jpg",
      userImage: "/profilepic.jpg"
    }
  ]

  return (
    <>
      <Navbar />
      {reviews.map((review) => (
        <FeedCard
          key={review.id}
          name={review.usuario}
          movie={review.filme}
          review={review.review}
          poster={review.poster}
          userImage={review.userImage}
        />
      ))}
    </>
  )
}
