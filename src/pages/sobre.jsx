import { getSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"

import { Navbar } from "components/Navbar"

import S from "styles/Sobre.module.css"

import { getNotifications } from "../../lib/notifications"
import { buscarUser } from "../../lib/prisma"

export default function Sobre({ user, notificationsData }) {
  return (
    <>
      <Head>
        <title>Zine - Sobre</title>
      </Head>
      <Navbar nickname={user?.nickname} notificacoes={notificationsData} />
      <div className={S.container}>
        <div className={S.sobre}>
          <p>Zine.Space - 2023</p>
          <p>
            <Link target={"_blank"} href={"https://github.com/ewerson2/"}>
              Ewerson
            </Link>{" "}
            &{" "}
            <Link target={"_blank"} href={"https://github.com/vinivilares/"}>
              Marcus
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    const user = await buscarUser(session.user.email)
    const notificationsData = await getNotifications(user)

    return {
      props: { user: JSON.parse(JSON.stringify(user)), notificationsData }
    }
  }

  return {
    props: {}
  }
}
