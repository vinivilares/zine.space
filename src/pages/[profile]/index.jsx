import { useRouter } from "next/router"

export default function Profile() {
  const router = useRouter()
  const { profile } = router.query
  return <h1 style={{ color: "white" }}>Profile {profile}</h1>
}
