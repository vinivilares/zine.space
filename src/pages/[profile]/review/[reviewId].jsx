import { useRouter } from "next/router"

export default function Review() {
  const router = useRouter()
  const { profile, reviewId } = router.query

  return (
    <h1 style={{ color: "white" }}>
      Review {profile}, ID {reviewId}
    </h1>
  )
}
